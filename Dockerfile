# Builds and runs the Go2Trip MCP server locally over stdio.
# No configuration or credentials are needed: it forwards to the hosted Go2Trip server.
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

CMD ["node", "dist/index.js"]
