#!/bin/sh
# Typechecks the application against a scratch copy of the tree with the
# curriculum content files stubbed out.
#
# Needed because curriculum files are large and are sometimes mid-write; a
# single parse error in one of them makes tsc skip semantic checking for the
# entire project, which silently turns every other file's result into a false
# clean. Stubbing them keeps the app under real semantic checking regardless.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRATCH="${TMPDIR:-/tmp}/aiml-tc"

rm -rf "$SCRATCH"
mkdir -p "$SCRATCH"
cp "$ROOT/tsconfig.json" "$ROOT/next-env.d.ts" "$ROOT/package.json" "$SCRATCH/" 2>/dev/null || true
cp -r "$ROOT/src" "$ROOT/tests" "$ROOT/scripts" "$ROOT/prisma" "$SCRATCH/" 2>/dev/null || true
ln -s "$ROOT/node_modules" "$SCRATCH/node_modules" 2>/dev/null || true

for f in "$SCRATCH"/src/data/curriculum/*.ts; do
  case "$f" in
    */index.ts) continue ;;
  esac
  printf "import type { LearningUnit } from '@/types/curriculum';\n\nexport const UNITS: LearningUnit[] = [];\n" > "$f"
done

cd "$SCRATCH"
OUT=$(npx tsc --noEmit 2>&1 || true)
printf '%s\n' "$OUT" | grep -v '^$' | head -40
if [ -z "$(printf '%s' "$OUT" | tr -d '[:space:]')" ]; then
  echo "--- app typecheck clean (curriculum content stubbed) ---"
fi
