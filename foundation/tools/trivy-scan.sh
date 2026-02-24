#!/usr/bin/env bash
set -euo pipefail

# Local Trivy scan of the workspace to validate fixes
# Outputs the report to foundation/report.json (ignored by git)
TRIVY_CMD=${TRIVY_CMD:-trivy}
OUT_PATH="foundation/report.json"
TARGET_DIR="foundation"

# Scan local files for vulnerabilities, secrets, and misconfigurations
"$TRIVY_CMD" fs --scanners vuln,secret,misconfig \
  --format json \
  --output "$OUT_PATH" \
  "$TARGET_DIR"

echo "Trivy scan complete. Report written to $OUT_PATH"