import { createClient } from "jsr:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("MY_URL") ?? "",
  Deno.env.get("MY_ANON_KEY") ?? ""
);

class get_table_model {
  async getAll(table: string) {
    return await supabase.from(table).select("*");
  }

  // async getAllByPayment() {
  //   return await supabase.from("payment").select("");
  // }

  async getById(id: string) {
    return await supabase.from("ledger").select("*").eq("id", id);
  }

  async getByUserId(userId: string) {
    return await supabase.from("ledger").select("*").eq("user_id", userId);
  }

  async getByItemId(item: string) {
    return await supabase.from("ledger").select("*").eq("item", item);
  }

  async getByCount(count: number) {
    return await supabase.from("ledger").select("*").eq("count", count);
  }

  async getByCostPrice(costPrice: number) {
    return await supabase
      .from("ledger")
      .select("*")
      .eq("cost_price", costPrice);
  }

  async getBySalePrice(salePrice: number) {
    return await supabase
      .from("ledger")
      .select("*")
      .eq("sale_price", salePrice);
  }

  async getByProfit(profit: number) {
    return await supabase.from("ledger").select("*").eq("profit", profit);
  }

  async getByDate(date: string) {
    return await supabase.from("ledger").select("*").eq("created_at", date);
  }

  async getByUpdate(update: string) {
    return await supabase.from("ledger").select("*").eq("updated_at", update);
  }

  async getByCategory(category: string) {}
}

export default get_table_model;
