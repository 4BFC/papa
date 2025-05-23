import { put_controller } from "../controller/index.ts";

const supabase = new put_controller();

const put_ledger_view = async (req: Request) => {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/api/ledger/") && req.method === "PUT") {
    try {
      const { data, error } = await supabase.handlePut(req);
      console.log("data check in view", data);

      //RLS 위반 오류 처리, 단, rollback 데이터 제거,예외처리는 불가. 이를 Model에서 처리
      if (error === "RLS_POLICY_VIOLATION" || !data || data.length === 0) {
        return new Response(
          JSON.stringify({
            error: "Rollback data deleted, Access denied by RLS policy",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

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

  console.log("PUT 요청된 URL path:", url.pathname);
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};

export default put_ledger_view;
