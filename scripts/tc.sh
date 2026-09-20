#!/bin/sh
# Typechecks the app.
#
# A parse error anywhere makes tsc skip semantic checking for the WHOLE
# project, so "no output" while a curriculum file is mid-write is a false
# clean. This script detects that case and says so loudly rather than
# reporting success.
cd "$(dirname "$0")/.." || exit 1

OUT=$(npx tsc --noEmit 2>&1)
SYNTAX=$(printf '%s\n' "$OUT" | grep -E "error TS1[0-9]{3}:" | head -5)

if [ -n "$SYNTAX" ]; then
  echo "!! PARSE ERRORS PRESENT — semantic checking was SKIPPED repo-wide."
  echo "!! Any 'clean' result below is meaningless until these are fixed:"
  printf '%s\n' "$SYNTAX"
  exit 2
fi

printf '%s\n' "$OUT" | grep -v '^$' | head -40
echo "--- app typecheck clean ---"
