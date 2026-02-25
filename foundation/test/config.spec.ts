import { expect } from "chai";
import { getAwsConfig, getGithubConfig, getDbUrl } from "../src/config";

describe("config.ts environment loading", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("reads AWS credentials from environment variables", () => {
    process.env.AWS_ACCESS_KEY_ID = "TEST_AKID";
    process.env.AWS_SECRET_ACCESS_KEY = "TEST_SECRET";

    const cfg = getAwsConfig();
    expect(cfg.accessKeyId).to.equal("TEST_AKID");
    expect(cfg.secretAccessKey).to.equal("TEST_SECRET");
  });

  it("reads GitHub config from environment variables", () => {
    process.env.GITHUB_TOKEN = "TEST_GH_TOKEN";
    process.env.GITHUB_OWNER = "my-org";

    const gh = getGithubConfig();
    expect(gh.token).to.equal("TEST_GH_TOKEN");
    expect(gh.owner).to.equal("my-org");
  });

  it("reads Database URL from environment variables", () => {
    process.env.DATABASE_URL = "postgres://user:pass@host:5432/db";
    expect(getDbUrl()).to.equal("postgres://user:pass@host:5432/db");
  });
});