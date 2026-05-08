#!/usr/bin/env python3
"""
PostToolUse hook — per-file design system check.
Runs after every Write/Edit on a .tsx/.ts file in src/components or src/app.
Reports violations immediately so they're caught before the next edit.
"""

import sys
import json
import os

try:
    data = json.load(sys.stdin)
    fp = data.get("tool_input", {}).get("file_path", "")

    # Only check TSX/TS source files
    if not fp or not fp.endswith((".tsx", ".ts")):
        sys.exit(0)
    if "/src/components/" not in fp and "/src/app/" not in fp:
        sys.exit(0)
    if "node_modules" in fp or "-config." in fp or "/sanity/" in fp:
        sys.exit(0)
    if not os.path.exists(fp):
        sys.exit(0)

    violations = []

    with open(fp, "r") as f:
        lines = f.readlines()

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        # Skip comment lines
        if stripped.startswith("//") or stripped.startswith("*"):
            continue

        # rounded-* (except rounded-none which is a correction)
        if "rounded-" in line and "rounded-none" not in line:
            violations.append(f"L{i}: `rounded-*` — sharp corners only")

        # shadow-*
        if "shadow-" in line:
            violations.append(f"L{i}: `shadow-*` — no shadows")

        # Raw <img> tag (logo exception: alt="STYLEFINDEN")
        if "<img " in line and 'alt="STYLEFINDEN"' not in line and "ImgPlaceholder" not in line:
            violations.append(f"L{i}: raw `<img>` — use ImgPlaceholder")

        # Forbidden non-gray color classes (not in config files)
        for color in ["text-blue-", "text-red-", "text-green-", "text-indigo-", "text-purple-",
                      "bg-blue-", "bg-red-", "bg-indigo-", "bg-purple-", "bg-green-"]:
            if color in line:
                violations.append(f"L{i}: `{color}*` — only black/white/gray palette")
                break

    if violations:
        fname = os.path.basename(fp)
        msg = f"⚠️  {fname} — {len(violations)} design system violation(s):\n"
        msg += "\n".join(f"  • {v}" for v in violations[:5])
        if len(violations) > 5:
            msg += f"\n  … and {len(violations) - 5} more"
        print(json.dumps({"systemMessage": msg}))

except Exception:
    # Never block the tool — silent failure
    pass
