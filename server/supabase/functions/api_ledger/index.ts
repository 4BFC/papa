import { createClient } from "jsr:@supabase/supabase-js";

console.log("This is ledger function");

const supabase = createClient(
  Deno.env.get("MY_URL") ?? "",
  Deno.env.get("MY_ANON_KEY") ?? ""
);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  /**Get인 경우 동작 */
  if (url.pathname === "/api_ledger" && req.method === "GET") {
    try {
      const { data, error } = await supabase.from("ledger").select("*");
      console.log("Fetched data:", data);
      return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // GET이 아닌 다른 메서드 처리
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
});
