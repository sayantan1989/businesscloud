import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const SERVER_URL = "http://localhost:3000";

async function main() {
  console.log("=== MCP Calculator Client Demo ===\n");

  try {
    // Create client
    const client = new Client(
      {
        name: "calculator-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    // Create transport
    const transport = new StreamableHTTPClientTransport(new URL(`${SERVER_URL}/mcp`));

    // Connect to server
    console.log("1. Connecting to server...");
    await client.connect(transport);
    console.log("   ✓ Connected to the server successfully.");
   // console.log(`   Protocol version: ${serverInfo.protocolVersion}\n`);

    // List available tools
    console.log("2. Listing available tools...");
    const toolsResponse = await client.listTools();
    toolsResponse.tools.forEach((tool) => {
      console.log(`   - ${tool.name}: ${tool.description}`);
    });
    console.log();

    // Test calculations
    console.log("3. Testing calculations...");

    const tests: Array<{ name: string; args: { a: number; b: number } }> = [
      { name: "add", args: { a: 10, b: 5 } }
    ];

    for (const test of tests) {
      try {
        const result = await client.callTool({
          name: "runTrivvyScan",
          arguments: { repoUrl: "https://github.com/sayantan1989/businesscloud", branch: "chore/remove-hardcoded-secrets" },
        });

        const resultText = (result as any).content
          .map((c: { type: string; text: any; }) => (c.type === "text" ? c.text : ""))
          .join("");

        if (result.isError) {
          console.log(`   ❌ ${test.name}(${test.args.a}, ${test.args.b}) -> ${resultText}`);
        } else {
          console.log(`   ✓ ${test.name}(${test.args.a}, ${test.args.b}) -> ${resultText}`);
        }
      } catch (error) {
        console.log(
          `   ❌ ${test.name}(${test.args.a}, ${test.args.b}) -> Error: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }

    console.log("\n4. Closing connection...");
    await client.close();
    console.log("   ✓ Connection closed\n");

    console.log("=== Demo Complete ===");
  } catch (error) {
    console.error("❌ Fatal Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main().catch(console.error);