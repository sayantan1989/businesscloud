import { expect } from "chai";

describe("Config module", () => {
  it("should read values from environment variables", async () => {
    // Arrange: set environment variables before importing the module
    process.env.AWS_ACCESS_KEY_ID = "test-access-key";
    process.env.AWS_SECRET_ACCESS_KEY = "test-secret-key";
    process.env.GITHUB_TOKEN = "test-github-token";
    process.env.GITHUB_OWNER = "test-owner";
    const testDbUrl = "postgres://tester:secret@localhost:5432/testdb";
    process.env.DB_URL = testDbUrl;

    // Act: dynamically import after setting env to ensure values are read
    const { awsConfig, githubConfig, connectToDb } = await import("../src/config");

    // Assert
    expect(awsConfig.accessKeyId).to.equal("test-access-key");
    expect(awsConfig.secretAccessKey).to.equal("test-secret-key");
    expect(githubConfig.token).to.equal("test-github-token");
    expect(githubConfig.owner).to.equal("test-owner");
    const dbUrl = await connectToDb();
    expect(dbUrl).to.equal(testDbUrl);
  });
});