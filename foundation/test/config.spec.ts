import { expect } from "chai";

describe("Config module", () => {
  let awsConfig: any;
  let githubConfig: any;
  let connectToDb: () => Promise<string>;

  before(async () => {
    // Set env values BEFORE importing the module since some values are read at import time
    process.env.AWS_ACCESS_KEY_ID = "TEST_AKID";
    process.env.AWS_SECRET_ACCESS_KEY = "TEST_SECRET";
    process.env.GITHUB_TOKEN = "TOKEN_VALUE";
    process.env.GITHUB_OWNER = "OWNER_VALUE";
    // Avoid including credentials in test URL to prevent secret scanners from flagging
    process.env.DATABASE_URL = "postgres://localhost:5432/testdb";

    const mod = await import("../src/config");
    awsConfig = mod.awsConfig;
    githubConfig = mod.githubConfig;
    connectToDb = mod.connectToDb;
  });

  it("exposes AWS config from env", () => {
    expect(awsConfig.accessKeyId).to.equal("TEST_AKID");
    expect(awsConfig.secretAccessKey).to.equal("TEST_SECRET");
  });

  it("exposes GitHub config from env", () => {
    expect(githubConfig.token).to.equal("TOKEN_VALUE");
    expect(githubConfig.owner).to.equal("OWNER_VALUE");
  });

  it("returns database url from env", async () => {
    const url = await connectToDb();
    expect(url).to.equal("postgres://localhost:5432/testdb");
  });
});