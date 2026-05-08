#!/usr/bin/env bash
# Stop hook — session-end frontend audit summary.
# Runs when Claude finishes a session. If .tsx/.ts files were modified,
# runs TypeScript check + design violation grep and reports the totals.

cd /Users/furkan/meticulhoar/stylefinden 2>/dev/null || exit 0

# Check if any src .tsx/.ts files changed this session
CHANGED=$(git diff --name-only HEAD 2>/dev/null | grep -E "^src/.+\.(tsx|ts)$" | wc -l | tr -d ' ') || CHANGED=0
STAGED=$(git diff --cached --name-only 2>/dev/null | grep -E "^src/.+\.(tsx|ts)$" | wc -l | tr -d ' ') || STAGED=0
TOTAL_CHANGED=$((CHANGED + STAGED))

if [ "$TOTAL_CHANGED" -eq 0 ]; then
  # Nothing changed — skip audit
  exit 0
fi

# TypeScript errors
TS_ERRORS=$(npx --yes tsc --noEmit 2>&1 | grep -cE "error TS[0-9]+" 2>/dev/null) || TS_ERRORS=0

# Design violations (excluding intentional exceptions)
SHADOW=$(grep -r "shadow-" src/components src/app --include="*.tsx" 2>/dev/null \
  | grep -v "^\s*//" | wc -l | tr -d ' ') || SHADOW=0

ROUNDED=$(grep -r "rounded-" src/components src/app --include="*.tsx" 2>/dev/null \
  | grep -v "rounded-none" | grep -v "^\s*//" | wc -l | tr -d ' ') || ROUNDED=0

RAW_IMG=$(grep -r "<img " src/components src/app --include="*.tsx" 2>/dev/null \
  | grep -v 'alt="STYLEFINDEN"' | grep -v "^\s*//" | wc -l | tr -d ' ') || RAW_IMG=0

# Calculate total issues
TOTAL_ISSUES=$((TS_ERRORS + SHADOW + ROUNDED + RAW_IMG))

# Build the report message
if [ "$TOTAL_ISSUES" -eq 0 ]; then
  STATUS="✅ Frontend clean"
  DETAIL="TypeScript: 0 errors · Design system: 0 violations"
else
  STATUS="⚠️  Frontend issues found"
  PARTS=""
  [ "$TS_ERRORS" -gt 0 ] && PARTS="${PARTS}TypeScript: ${TS_ERRORS} error(s)  "
  [ "$SHADOW" -gt 0 ]    && PARTS="${PARTS}shadow-*: ${SHADOW}  "
  [ "$ROUNDED" -gt 0 ]   && PARTS="${PARTS}rounded-*: ${ROUNDED}  "
  [ "$RAW_IMG" -gt 0 ]   && PARTS="${PARTS}raw <img>: ${RAW_IMG}  "
  DETAIL="${PARTS}→ run /frontend-audit to fix"
fi

jq -n \
  --arg status "$STATUS" \
  --arg detail "$DETAIL" \
  --arg changed "$TOTAL_CHANGED" \
  '{"systemMessage": ("🔍 Session Audit (" + $changed + " file(s) changed)\n" + $status + "\n" + $detail)}' 2>/dev/null || true
