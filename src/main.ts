import { createBrowserRouter, routes } from "./router";

const root = document.getElementById("app")!;

const router = createBrowserRouter(routes, root);

export { router };
