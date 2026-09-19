#!/bin/sh
# Typecheck, ignoring in-flight curriculum content files (authored concurrently).
cd "$(dirname "$0")/.." || exit 1
npx tsc --noEmit 2>&1 | grep -v '^src/data/curriculum/' | grep -v '^$' | head -40
echo "--- app typecheck done ---"
