<p align="center">
  <img src="https://raw.githubusercontent.com/blackrabbit-travel/go2trip-mcp/main/assets/go2trip-icon.png" alt="Go2Trip" width="96" height="96">
</p>

# Go2Trip — MCP Server

**Go2Trip, your travel solution, inside any MCP client.** Go2Trip is a booking site for
flights and hotels. This server brings Go2Trip into the conversation: describe where you
want to go in plain words and get live prices back, with a link to book on
[go2trip.com](https://www.go2trip.com).

- **Endpoint:** `https://mcp.go2trip.com/mcp` (Streamable HTTP)
- **Sign-in:** none. No account, no API key, no consent screen.
- **Website:** [mcp.go2trip.com](https://mcp.go2trip.com) ·
  [privacy policy](https://mcp.go2trip.com/privacy) · [terms](https://mcp.go2trip.com/terms)

Go2Trip hosts the server, so for everyday use there is nothing to install. This repository
also holds a small local (stdio) server for clients that start a process instead of opening a
URL; see [Run it locally](#run-it-locally).

## Connect

Clients that support remote servers:

```json
{
  "mcpServers": {
    "go2trip": {
      "type": "http",
      "url": "https://mcp.go2trip.com/mcp"
    }
  }
}
```

## Run it locally

The local server in this repository speaks stdio and forwards every request to the hosted
Go2Trip server. It holds no travel logic and no secrets, so it always offers exactly the
tools the hosted server offers.

```bash
git clone https://github.com/blackrabbit-travel/go2trip-mcp
cd go2trip-mcp
npm install
npm run build
npm run smoke     # starts the server, runs the MCP handshake and lists its tools
```

Then point a stdio MCP client at the built entry:

```json
{
  "mcpServers": {
    "go2trip": {
      "command": "node",
      "args": ["/path/to/go2trip-mcp/dist/index.js"]
    }
  }
}
```

Or with Docker:

```bash
docker build -t go2trip-mcp .
docker run -i --rm go2trip-mcp
```

| Variable | Default | Description |
|---|---|---|
| `GO2TRIP_MCP_URL` | `https://mcp.go2trip.com/mcp` | The hosted server to forward to. Leave unset. |

## Tools

- **search_flights** — Search flights by **origin, destination, dates, passengers and cabin
  class**. Returns options tagged `best` / `cheapest` / `fastest`, each with price,
  durations, layovers, remaining seats, flight numbers and a booking link.

Hosts that support MCP Apps also show the results in an interactive panel.

Try asking:

- *"Find round-trip flights from London to Barcelona next month for 2 adults."*
- *"What's the cheapest flight from Dubai to Paris in January, and is there a faster one
  worth paying more for?"*

Mention where you live and, where Go2Trip has a local site, prices are shown in your local
currency and the booking link opens on that site.

## Read-only

Go2Trip searches and presents options. It never books, pays or changes anything on your
behalf; you complete the booking yourself on go2trip.com. The details you provide are
forwarded once to the search engine to fulfil your request and are not retained.

## About

Operated by BTL Travel. The hosted service and its search engine are proprietary; the
**MIT license** in this repository covers the files here: the local server, `Dockerfile`,
`server.json` and the configuration examples.
