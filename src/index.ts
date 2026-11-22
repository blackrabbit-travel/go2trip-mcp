#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// A local (stdio) MCP server for Go2Trip. It holds no travel logic of its own: it
// connects to the hosted Go2Trip server and passes every request through, so it
// always offers exactly the tools the hosted server offers. No sign-in, no secrets.
const DEFAULT_URL = "https://mcp.go2trip.com/mcp";
const url = new URL(process.env.GO2TRIP_MCP_URL?.trim() || DEFAULT_URL);

const hosted = new Client({ name: "go2trip-mcp", version: "1.0.0" });
await hosted.connect(new StreamableHTTPClientTransport(url));

const offered = hosted.getServerCapabilities() ?? {};
const server = new Server(hosted.getServerVersion() ?? { name: "go2trip", version: "1.0.0" }, {
  capabilities: {
    ...(offered.tools ? { tools: {} } : {}),
    ...(offered.resources ? { resources: {} } : {}),
  },
  instructions: hosted.getInstructions(),
});

if (offered.tools) {
  server.setRequestHandler(ListToolsRequestSchema, (request) => hosted.listTools(request.params));
  server.setRequestHandler(CallToolRequestSchema, (request) => hosted.callTool(request.params));
}
if (offered.resources) {
  server.setRequestHandler(ListResourcesRequestSchema, (request) => hosted.listResources(request.params));
  server.setRequestHandler(ListResourceTemplatesRequestSchema, (request) =>
    hosted.listResourceTemplates(request.params),
  );
  server.setRequestHandler(ReadResourceRequestSchema, (request) => hosted.readResource(request.params));
}

await server.connect(new StdioServerTransport());

// stdout carries the MCP protocol; logs go to stderr.
console.error(`go2trip-mcp running on stdio, forwarding to ${url.href}`);
