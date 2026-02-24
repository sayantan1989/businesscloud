# 


Tools : 

GIT : https://github.com/sayantan1989

Mend : Can't run CVE without paid version

Install Trivvy : brew install aquasecurity/trivy/trivy

Run Trivvy : trivy repo --scanners vuln,secret,misconfig \
  --format json \
  --output report.json \
  https://github.com/sayantan1989/businesscloud

Install GITHub CLI for auto-pr : 
brew install gh
gh auth login

Prompts Example : 

- can you read the file report.json section "foundation/src/config.ts" and make the necessary code changes in config.ts

- Read bot-instruction and perform the needed action