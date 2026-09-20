#!/bin/bash
# Full verification, in the order that fails fastest.
#
#   ./scripts/verify-all.sh          checks only
#   ./scripts/verify-all.sh --full   also builds and runs the e2e + perf suites
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

FULL=0
[ "${1:-}" = "--full" ] && FULL=1

PASS=0
FAIL=0
RESULTS=()

step() {
  local name="$1"; shift
  printf '\n\033[1m▸ %s\033[0m\n' "$name"
  if "$@"; then
    PASS=$((PASS + 1)); RESULTS+=("  ✓ $name")
  else
    FAIL=$((FAIL + 1)); RESULTS+=("  ✗ $name")
  fi
}

step "Typecheck"            npx tsc --noEmit
step "Lint"                 npx eslint src scripts tests --max-warnings=0
step "Curriculum integrity" npx tsx scripts/verify-curriculum.ts --stats
step "Unit + integration"   npx vitest run

if [ "$FULL" = "1" ]; then
  step "Production build"   npm run build
  step "End-to-end"         npx playwright test
fi

printf '\n\033[1m───────── summary ─────────\033[0m\n'
printf '%s\n' "${RESULTS[@]}"
printf '\n  %d passed, %d failed\n\n' "$PASS" "$FAIL"
exit $((FAIL > 0 ? 1 : 0))
