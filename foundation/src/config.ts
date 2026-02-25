import dotenv from "dotenv";

dotenv.config();

export type AwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
};

export type GithubConfig = {
  token: string;
  owner: string;
};

/**
 * Read AWS credentials from environment variables.
 * Never hardcode secrets in source code.
 */
export function getAwsConfig(): AwsConfig {
  return {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  };
}

/**
 * Read GitHub configuration from environment variables.
 * GH token must be provided via environment, not in source.
 */
export function getGithubConfig(): GithubConfig {
  return {
    token: process.env.GITHUB_TOKEN ?? "",
    owner: process.env.GITHUB_OWNER ?? "",
  };
}

/**
 * Read database connection URL from environment variables.
 * Do not embed credentials directly in code.
 */
export function getDbUrl(): string {
  return process.env.DATABASE_URL ?? "";
}