import { get_ledger_view } from "../view/index.ts";

console.log("This is ledger function");

Deno.serve(get_ledger_view);
