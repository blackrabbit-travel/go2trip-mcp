<p align="center">
  <img src="https://mcp.go2trip.com/assets/go2trip-icon.png" alt="Go2Trip" width="96" height="96">
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

Go2Trip hosts the server. There is nothing to install or build: this repository holds the
configuration that connects an MCP client to it.

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

Clients that only run local (stdio) servers, through the
[`mcp-remote`](https://www.npmjs.com/package/mcp-remote) bridge:

```json
{
  "mcpServers": {
    "go2trip": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.go2trip.com/mcp"]
    }
  }
}
```

Or with Docker:

```bash
docker build -t go2trip-mcp .
docker run -i --rm go2trip-mcp
```

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
**MIT license** in this repository covers the files here (`Dockerfile`, `server.json` and
the configuration examples).
