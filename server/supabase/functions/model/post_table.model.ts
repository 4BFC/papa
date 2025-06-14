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

interface ValidPaymentBody {
  ledger_id: number;
  type: string;
  price: number;
  profit: number;
}

/**
//타입 검사
type Validator = (body: any) => boolean;

const validators: Record<string, Validator> = {
  ledger: (b) => isValidBody(b),                 // 객체 1개
  payment: (b) => isValidPaymentBodyArray(b),    // 배열
};
 */

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

function isValidPaymentBody(obj: ValidPaymentBody): obj is ValidPaymentBody {
  return (
    typeof obj === "object" &&
    typeof obj.ledger_id === "number" &&
    typeof obj.type === "string" &&
    typeof obj.price === "number" &&
    typeof obj.profit === "number"
  );
}

function isValidPaymentBodyArray(
  arr: ValidPaymentBody[]
): arr is ValidPaymentBody[] {
  return (
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === "object" &&
        typeof item.ledger_id === "number" &&
        typeof item.type === "string" &&
        typeof item.price === "number" &&
        typeof item.profit === "number"
    )
  );
}
const valid = {
  ledger: isValidBody,
  payment: isValidPaymentBodyArray,
};

const validPut = {
  ledger: isValidBody,
  payment: isValidPaymentBody,
};

class post_table_model {
  async post(req: Request, table: string) {
    try {
      const body = await req.json();
      console.log("body check in model", body);

      if (!valid[table](body)) {
        return { error: "Invalid body schema" };
      }

      const { data, error } = await supabase
        .from(table)
        // .insert([body])
        .insert(body)
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
  async put(req: Request, id: string, table: string) {
    try {
      const body = await req.json();
      if (!validPut[table](body)) {
        return { error: "Invalid body schema" };
      }

      const { data, error } = await supabase
        .from(table)
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
