import { createClient } from "jsr:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("MY_URL") ?? "",
  Deno.env.get("MY_ANON_KEY") ?? ""
);

interface PostTableModel {
  id: string;
  item: string;
  count: number;
  cost_price: number;
  sale_price: number;
  profit: number;
  type: boolean;
  //   created_at: string;
  //   updated_at: string;
}

interface ValidBody {
  item: string;
  count: number;
  cost_price: number;
  sale_price: number;
  profit: number;
  type: boolean;
}

//유효성 검사
function isValidBody(obj: ValidBody): obj is PostTableModel {
  return (
    typeof obj === "object" &&
    typeof obj.item === "string" &&
    typeof obj.cost_price === "number" &&
    typeof obj.sale_price === "number" &&
    typeof obj.profit === "number" &&
    typeof obj.type === "boolean"
  );
}

class post_table_model {
  async post(req: Request) {
    try {
      const body = await req.json();
      console.log("body check in model", body);
      if (!isValidBody(body)) {
        return { error: "Invalid body schema" };
      }

      const { data, error } = await supabase
        .from("ledger")
        .insert([body])
        .select("*");
      console.log("data check in model", data);

      if (error?.code === "42501") {
        throw new Error("RLS_POLICY_VIOLATION");
      }

      return { data, error };
    } catch (error) {
      return { error: error?.message ?? "Unexpected error" };
    }
  }
  async put(req: Request, id: string) {
    try {
      const body = await req.json();
      if (!isValidBody(body)) {
        return { error: "Invalid body schema" };
      }

      const { data, error } = await supabase
        .from("ledger")
        .update([body])
        .eq("id", id)
        .select("*");

      if (error?.code === "42501") {
        throw new Error("RLS_POLICY_VIOLATION");
      }

      return { data, error };
    } catch (error) {
      return { error: error?.message ?? "Unexpected error" };
    }
  }
}

export default post_table_model;
