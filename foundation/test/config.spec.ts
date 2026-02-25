import { expect } from "chai";

// Helper to reload the module after changing env
function loadConfig() {
  // Clear the require cache for the TS module path
  // ts-node/register compiles TS on the fly; require.resolve works with TS paths
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const resolved = require.resolve("../src/config");
  delete require.cache[resolved];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("../src/config");
}

describe("Config environment-driven values", () => {
  beforeEach(() => {
    // Reset env vars before each test
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.GITHUB_TOKEN;
    delete process.env.GITHUB_OWNER;
    delete process.env.DATABASE_URL;
  });

  it("reads credentials from environment variables", () => {
    process.env.AWS_ACCESS_KEY_ID = "TEST_AWS_KEY";
    process.env.AWS_SECRET_ACCESS_KEY = "TEST_AWS_SECRET";

    const { AWS } = loadConfig();
    expect(AWS.accessKeyId).to.equal("TEST_AWS_KEY");
    expect(AWS.secretAccessKey).to.equal("TEST_AWS_SECRET");
  });

  it("reads GitHub config from environment variables", () => {
    process.env.GITHUB_TOKEN = "TEST_GH_TOKEN";
    process.env.GITHUB_OWNER = "test-org";

    const { githubConfig } = loadConfig();
    expect(githubConfig.token).to.equal("TEST_GH_TOKEN");
    expect(githubConfig.owner).to.equal("test-org");
  });

  it("defaults GitHub owner to 'my-org' when GITHUB_OWNER is not set", () => {
    process.env.GITHUB_TOKEN = "TEST_GH_TOKEN";
    // GITHUB_OWNER intentionally not set

    const { githubConfig } = loadConfig();
    expect(githubConfig.token).to.equal("TEST_GH_TOKEN");
    expect(githubConfig.owner).to.equal("my-org");
  });

  it("connectToDb returns DATABASE_URL from environment", async () => {
    process.env.DATABASE_URL = "postgres://user:pass@localhost:5432/mydb";

    const { connectToDb } = loadConfig();
    const url = await connectToDb();
    expect(url).to.equal("postgres://user:pass@localhost:5432/mydb");
  });
});