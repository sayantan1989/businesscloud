#!/bin/bash

# 1. Capture variables from command line arguments
# Usage: ./scan.sh <REPO_URL> <BRANCH_NAME>
REPO_URL=$1
BRANCH_NAME=$2

# 2. Check if arguments are provided, otherwise exit with instructions
if [ -z "$REPO_URL" ] || [ -z "$BRANCH_NAME" ]; then
    echo "❌ Usage: ./scan.sh <REPO_URL> <BRANCH_NAME>"
    echo "Example: ./scan.sh https://github.com/sayantan1989/businesscloud main"
    exit 1
fi

# 3. Create a descriptive filename for the report
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
# Clean the repo name for use in a filename (removes https://github.com/)
SAFE_REPO_NAME=$(echo $REPO_URL | sed 's|https://github.com/||' | tr '/' '_')
OUTPUT_FILE="trivy_${SAFE_REPO_NAME}_${BRANCH_NAME}_${TIMESTAMP}.json"

echo "🛡️  Scanning Repo: $REPO_URL"
echo "🌿 Branch: $BRANCH_NAME"
echo "📄 Report: $OUTPUT_FILE"

# 4. Run the Trivy command using the variables
trivy repo \
  --branch "$BRANCH_NAME" \
  --scanners vuln,secret,misconfig \
  --format json \
  --output "$OUTPUT_FILE" \
  "$REPO_URL"

if [ $? -eq 0 ]; then
  echo "✅ Scan completed successfully."
else
  echo "❌ Scan failed."
fi