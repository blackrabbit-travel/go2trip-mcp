# Runs the hosted Go2Trip MCP server as a local (stdio) process, for clients and
# directories that start a process instead of opening a URL. No sign-in, no secrets.
FROM node:22-alpine
RUN npm install -g mcp-remote@0.16.7
ENTRYPOINT ["mcp-remote", "https://mcp.go2trip.com/mcp"]
