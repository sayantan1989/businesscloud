// ❌ BAD PRACTICE: Hardcoded secrets
const AWS_ACCESS_KEY_ID = "AKIAIMORHT6EXAMPLE"; // Trivy recognizes the AKIA pattern
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

export const githubConfig = {
  // Trivy identifies GitHub Personal Access Tokens
  token: "ghp_J9s8d7f6g5h4j3k2l1m0n9o8p7q6r5s4t3u2", 
  owner: "my-org"
};

async function connectToDb() {
  // Trivy flags connection strings with passwords
  const dbUrl = "postgres://admin:p@ssword123@localhost:5432/mydb";
  return dbUrl;
}