import { post_table_model } from "../model/index.ts";

class post_controller {
  private model: post_table_model;

  constructor() {
    this.model = new post_table_model();
  }

  async handlePost(req: Request) {
    try {
      const { data, error } = await this.model.post(req);
      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default post_controller;
