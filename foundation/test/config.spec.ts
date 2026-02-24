import { expect } from "chai";
import { readFileSync } from "fs";
import { join } from "path";

describe("Secrets remediation in config.ts", () => {
  it("should not contain hardcoded secrets anymore and should use environment variables", () => {
    const configSource = readFileSync(join(__dirname, "../src/config.ts"), "utf8");

    // Ensure previous hardcoded patterns are gone
    expect(configSource).to.not.include("ghp_"); // GitHub PAT pattern
    expect(configSource).to.not.include("AKIA"); // AWS access key pattern
    expect(configSource).to.not.include("postgres://admin:p@ssword123@localhost:5432/mydb"); // Example DB URL with password

    // Ensure environment-based configuration is present
    expect(configSource).to.include("process.env.GITHUB_TOKEN");
    expect(configSource).to.include("process.env.AWS_ACCESS_KEY_ID");
    expect(configSource).to.include("process.env.AWS_SECRET_ACCESS_KEY");
    expect(configSource).to.include("process.env.DATABASE_URL");
  });
});