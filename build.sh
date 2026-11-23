#!/usr/bin/env bash
# Builds the Chrome Web Store upload: dist/eh-link-corrector-<version>.zip
set -euo pipefail
cd "$(dirname "$0")"
node test/convert.test.mjs
v=$(node -p "require('./manifest.json').version")
out="dist/eh-link-corrector-$v.zip"
mkdir -p dist && rm -f "$out"
python3 - "$out" <<'PY'
import sys, zipfile, os
with zipfile.ZipFile(sys.argv[1], "w", zipfile.ZIP_DEFLATED) as z:
    z.write("manifest.json")
    for d in ("src", "popup", "icons"):
        for root, _, files in os.walk(d):
            for f in sorted(files):
                z.write(os.path.join(root, f))
PY
echo "built $out"
