import { get_controller } from "../controller/index.ts";

console.log("This is ledger function");

const supabase = new get_controller();

const get_table_view = async (req: Request) => {
  const url = new URL(req.url);
  /**Get인 경우 동작 */
  // url.pathname === "/api_ledger" &&
  if (url.pathname === "/api/ledger" && req.method === "GET") {
    try {
      const { data, error } = await supabase.handleGetAll(req, "ledger");
      console.log("Fetched data:", data);
      return new Response(JSON.stringify({ data, error }), {
        status: 200,
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

  if (url.pathname === "/api/payment" && req.method === "GET") {
    try {
      const { data, error } = await supabase.handleGetAll(req, "payment");
      console.log("Fetched data:", data);
      return new Response(JSON.stringify({ data, error }), {
        status: 200,
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
  console.log("GET 요청된 URL path:", url.pathname);
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};

export default get_table_view;
