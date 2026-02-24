
import dotenv from "dotenv";
dotenv.config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";

export const githubConfig = {
  // Do not hardcode tokens; load from environment
  token: process.env.GITHUB_TOKEN ?? "",
  owner: process.env.GITHUB_OWNER ?? "my-org",
};

async function connectToDb() {
  // Load database URL from environment
  const dbUrl = process.env.DATABASE_URL ?? "";
  return dbUrl;
}
