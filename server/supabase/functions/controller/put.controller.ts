import { post_table_model } from "../model/index.ts";

class put_controller {
  private model: post_table_model;
  constructor() {
    this.model = new post_table_model();
  }

  /** only ledger */
  async handlePut(req: Request, table: string) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      console.log("id check in controller", id);

      if (!id) {
        return { error: "ID is Required" };
      }

      const { data, error } = await this.model.put(req, id, table);
      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default put_controller;
