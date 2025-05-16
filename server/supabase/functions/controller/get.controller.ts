import { get_table_model } from "../model/index.ts";

class get_controller {
  private model: get_table_model;

  constructor() {
    this.model = new get_table_model();
  }

  async handleGetAll(req: Request) {
    const { data, error } = await this.model.getAll();
    return { data, error };
  }
}

export default get_controller;
