import { expect } from "chai";

/* Reload helper to re-evaluate module with current env */
function loadGithubConfig(): { token: string; owner: string } {
  const modulePath = require.resolve("../src/config");
  delete require.cache[modulePath];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("../src/config");
  return mod.githubConfig as { token: string; owner: string };
}

describe("githubConfig env-driven values", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    // restore original environment
    process.env = { ...originalEnv };
  });

  it("defaults to empty token and 'my-org' owner when env vars are missing", () => {
    delete process.env.GITHUB_TOKEN;
    delete process.env.GITHUB_OWNER;

    const cfg = loadGithubConfig();
    expect(cfg.token).to.equal("");
    expect(cfg.owner).to.equal("my-org");
  });

  it("uses env vars when provided", () => {
    process.env.GITHUB_TOKEN = "test_token_123";
    process.env.GITHUB_OWNER = "acme-inc";

    const cfg = loadGithubConfig();
    expect(cfg.token).to.equal("test_token_123");
    expect(cfg.owner).to.equal("acme-inc");
  });
});