# Multi-stage, because the toolchain that builds this is several times the
# size of the thing it produces.
FROM node:22-alpine AS deps
WORKDIR /app
# Alpine's musl needs this for Prisma's engines.
RUN apk add --no-cache libc6-compat openssl
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# A build-time value only: the real key is supplied at runtime. Next needs
# *some* value because the session module validates its length at import.
ENV AUTH_SECRET="build-time-placeholder-not-a-secret-0123456789"
ENV NEXT_TELEMETRY_DISABLED=1
# Prisma will not read the datasource provider from the environment at run
# time — it is compiled into the generated client — so the provider this image
# will be pointed at has to be decided here, while it is being built.
#
# It defaults to postgresql because that is what a deployed container is
# almost always given, and because the failure in the other direction is
# silent: a client generated for SQLite against a postgresql:// URL builds,
# starts, serves every page that avoids the database, and then fails every
# read and write at request time. That exact fault reached production once
# already. Build with --build-arg DATABASE_PROVIDER=sqlite for an image meant
# to run against a mounted SQLite file.
ARG DATABASE_PROVIDER=postgresql
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Bind every interface. Next's standalone server listens on $HOSTNAME, and
# Docker sets that variable itself — to the container id normally, and to the
# host's name under `--network host`. Either way the server ends up bound to
# one interface rather than all of them, so it answers on the address Docker
# happened to pick and refuses the loopback address anything else would try.
# Running the image is the only way this shows up: it starts cleanly, reports
# "Ready", and then accepts no connection you would think to make.
ENV HOSTNAME=0.0.0.0

# Not root. A container that does not need write access to its own code
# should not have it.
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# `output: 'standalone'` traces exactly the dependencies the server uses, so
# this is the server plus what it imports, not the whole node_modules tree.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# The schema and the generated client, so `prisma migrate deploy` can run as a
# release step against this same image.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs
EXPOSE 3000

# AUTH_SECRET, DATABASE_URL and APP_URL are supplied by the platform's secret
# store. None of them is baked into this image.
CMD ["node", "server.js"]
