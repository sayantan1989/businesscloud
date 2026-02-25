
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";

export const githubConfig = {
  // Trivy identifies GitHub Personal Access Tokens
  token: process.env.GITHUB_TOKEN ?? "", 
  owner: process.env.GITHUB_OWNER ?? "my-org"
};

async function connectToDb() {
  // Trivy flags connection strings with passwords
  const dbUrl = process.env.DATABASE_URL ?? "postgres://localhost:5432/mydb";
  return dbUrl;
}