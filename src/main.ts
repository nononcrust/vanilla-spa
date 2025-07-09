import { createRouter, routes } from "./router";

const app = document.getElementById("app")!;

const router = createRouter(routes, app);

export { router };
