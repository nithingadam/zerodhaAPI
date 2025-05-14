import {placeOrder} from "./index.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});
server.tool(
  "buy-stock",
  {
    stock: z.string(),
    qty: z.number(),
  },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "BUY");
    return [{ type: "text", text: `${qty} shares of ${stock} have been bought.` }];
  }
);

server.tool(
  "sell-stock",
  z.object({
    stock: z.string(),
    qty: z.number(),
  }),
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "SELL");
    return [{ type: "text", text: `${qty} shares of ${stock} have been sold.` }];
  }
);


const transport = new StdioServerTransport();
await server.connect(transport);