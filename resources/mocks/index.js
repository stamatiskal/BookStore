import { setupWorker } from "msw/browser";
import { bookHandler } from "./handlers/bookHandler";

export const worker = setupWorker(...bookHandler);
