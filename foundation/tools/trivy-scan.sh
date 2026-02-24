trivy repo --scanners vuln,secret,misconfig \
  --format json \
  --output report.json \
  https://github.com/sayantan1989/businesscloud