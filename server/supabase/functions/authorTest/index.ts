import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

Deno.serve(async (req) => {
  // JWT 토큰 추출
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.replace("Bearer ", "");

  // Supabase 클라이언트 생성
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  // 사용자 정보 가져오기
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 여기서부터는 인증된 사용자만 접근 가능
  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
    user: user.email,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
