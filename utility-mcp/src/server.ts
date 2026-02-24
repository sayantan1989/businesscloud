import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { randomUUID } from "node:crypto";
import { z } from "zod"; // alternative to JSON schema, more suited for tools

import express, { Request, Response } from "express";

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

//URL : ->  /sap/c4c/api/v1/extensibilitymcp-service 
const mode = process.env.NODE_ENV;
console.log('mode ', mode);

let API_PREFIX;
if (mode === 'PROD') {
    API_PREFIX = "/sap/c4c/api/v1/extensibilitymcp-service";
}
else {
    API_PREFIX = '';
}

const app = express();
app.use(express.json());

const endpointMCP = `${API_PREFIX}/mcp`;
const endpointHealth = `${API_PREFIX}/health`;




// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// Create MCP Server factory
function createMcpServer(): McpServer {
    const server = new McpServer({
        name: "scan-tools-server",
        version: "1.0.0",
    });

    server.registerTool(
        "runTrivvyScan",
        {
            title: "Run Trivvy Scan on codebase",
            description: "Run Trivvy scan on the codebase, find issues",
            inputSchema: {
                repoUrl: z.string().describe("git repo url to scan"),
            },
        },
        async ({ repoUrl }) => {

            const outputFileName = 'report.json';
            const command = `trivy repo --scanners secret --format json --output ${outputFileName} ${repoUrl}`;

            try {
                console.log(`🔍 Starting Trivy scan for: ${repoUrl}...`);

                // 1. Execute the CLI command
                await execAsync(command);

                // 2. Read the generated JSON file
                const data = await fs.readFile(outputFileName, 'utf8');

                // 3. Parse and return the result
                const report = JSON.parse(data);
                console.log('✅ Scan complete and report parsed.',report);

                 return { content: [{ type: "text", text: JSON.stringify(report, null, 2) }] }
            } catch (error) {
                console.error('❌ Error running Trivy:', error);
                throw error;
            }

        }
    );
    return server;
}

// Handle POST requests for client-to-server communication
app.post(endpointMCP, async (req: Request, res: Response) => {
    try {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        let transport: StreamableHTTPServerTransport;

        if (sessionId && transports[sessionId]) {
            // Reuse existing transport for this session
            transport = transports[sessionId];
        } else if (!sessionId && isInitializeRequest(req.body)) {
            // New initialization request - create new transport and server
            transport = new StreamableHTTPServerTransport({
                sessionIdGenerator: () => randomUUID(),
                onsessioninitialized: (sessionId) => {
                    // Store the transport by session ID
                    transports[sessionId] = transport;
                    console.log(`New session initialized: ${sessionId}`);
                },
            });

            // Clean up transport when closed
            transport.onclose = () => {
                if (transport.sessionId) {
                    console.log(`Session closed: ${transport.sessionId}`);
                    delete transports[transport.sessionId];
                }
            };

            const server = createMcpServer();
            await server.connect(transport);
        } else {
            // Invalid request
            res.status(400).json({
                jsonrpc: "2.0",
                error: {
                    code: -32000,
                    message: "Bad Request: No valid session ID provided",
                },
                id: null,
            });
            return;
        }

        // Handle the request
        await transport.handleRequest(req, res, req.body);
    } catch (error) {
        console.error("Error handling MCP request:", error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: {
                    code: -32603,
                    message: "Internal server error",
                },
                id: null,
            });
        }
    }
});

// Handle GET requests for server-to-client notifications via SSE
app.get(endpointMCP, async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (!sessionId || !transports[sessionId]) {
        res.status(400).send("Invalid or missing session ID");
        return;
    }

    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
});

// Handle DELETE requests for session termination
app.delete(endpointMCP, async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (!sessionId || !transports[sessionId]) {
        res.status(400).send("Invalid or missing session ID");
        return;
    }

    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
});

// Health check endpoint
app.get(endpointMCP, (req: Request, res: Response) => {
    res.json({
        status: "healthy",
        activeSessions: Object.keys(transports).length,
    });
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`\n🚀 MCP scan tools running on ${PORT}`);
});