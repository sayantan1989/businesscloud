import "dotenv/config";

export type GithubConfig = {
  token: string;
  owner: string;
};

export const githubConfig: GithubConfig = {
  // Read from environment; do not hardcode secrets
  token: process.env.GITHUB_TOKEN ?? "",
  owner: process.env.GITHUB_OWNER ?? "my-org",
};

export type AwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
};

export const awsConfig: AwsConfig = {
  // Read from environment; do not hardcode secrets
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
};

export function getDatabaseUrl(): string {
  // Prefer DATABASE_URL from the environment; fallback contains no credentials
  return process.env.DATABASE_URL ?? "postgres://localhost:5432/mydb";
}