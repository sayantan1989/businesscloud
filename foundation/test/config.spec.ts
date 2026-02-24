import { expect } from "chai";
import { awsConfig, githubConfig, connectToDb } from "../src/config";

describe("Config env usage", () => {
  it("defaults to empty strings when env vars are unset", async () => {
    expect(awsConfig.accessKeyId).to.equal("");
    expect(awsConfig.secretAccessKey).to.equal("");
    expect(githubConfig.token).to.equal("");
    expect(githubConfig.owner).to.equal("");
    const dbUrl = await connectToDb();
    expect(dbUrl).to.equal("");
  });
});