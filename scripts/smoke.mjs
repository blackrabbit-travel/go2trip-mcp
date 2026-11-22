// Starts the built server over stdio, runs the MCP handshake and lists what it offers.
// It runs no search, so it costs nothing and never goes stale.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "go2trip-mcp-smoke", version: "1.0.0" });
await client.connect(new StdioClientTransport({ command: "node", args: ["dist/index.js"] }));

const info = client.getServerVersion();
console.log(`server: ${info?.title ?? info?.name} ${info?.version}`);

const { tools } = await client.listTools();
for (const tool of tools) console.log(`tool: ${tool.name} (${tool.title ?? "no title"})`);

if (client.getServerCapabilities()?.resources) {
  const { resources } = await client.listResources();
  for (const resource of resources) console.log(`resource: ${resource.uri}`);
}

await client.close();
if (tools.length === 0) {
  console.error("FAIL: the server offered no tools");
  process.exit(1);
}
console.log("PASS");
