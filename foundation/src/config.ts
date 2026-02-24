const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";

export const githubConfig = {
  // Trivy identifies GitHub Personal Access Tokens
  token: process.env.GITHUB_TOKEN ?? "",
  owner: process.env.GITHUB_OWNER ?? "my-org",
};

async function connectToDb() {
  // Use environment variable for connection string instead of hard-coded secret
  const dbUrl = process.env.DATABASE_URL ?? "";
  return dbUrl;
}