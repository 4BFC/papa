import {
  get_table_view,
  post_table_view,
  put_table_view,
} from "../view/index.ts";

console.log("This is ledger function");

Deno.serve(async (req: Request) => {
  const method = req.method;
  const url = new URL(req.url);
  if (url.pathname === "/api/ledger" && method === "GET") {
    return get_table_view(req);
  }
  if (url.pathname === "/api/ledger" && method === "POST") {
    return post_table_view(req);
  }
  if (url.pathname.startsWith("/api/ledger/") && method === "PUT") {
    return put_table_view(req);
  }
  if (url.pathname === "/api/payment" && method === "GET") {
    return get_table_view(req);
  }
  if (url.pathname === "/api/payment" && method === "POST") {
    return post_table_view(req);
  }
  if (url.pathname.startsWith("/api/payment/") && method === "PUT") {
    return put_table_view(req);
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
});
