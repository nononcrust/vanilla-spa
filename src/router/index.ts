import { CounterPage } from "../pages/counter";
import { HomePage } from "../pages/home";

type Router = {
  push: (path: Route["path"]) => void;
  replace: (path: Route["path"]) => void;
};

type Route = {
  path: string;
  component: string;
};

const createRoute = (props: { path: string; component: string }): Route => {
  return {
    path: props.path,
    component: props.component,
  };
};

export const createRouter = (routes: Route[], root: HTMLElement): Router => {
  const matchRoute = (path: string): Route | null => {
    return routes.find((route) => route.path === path) ?? null;
  };

  const render = () => {
    const currentPath = window.location.pathname;

    const matchedRoute = matchRoute(currentPath);

    if (!matchedRoute) {
      throw new Error(currentPath + " 경로에 해당하는 라우트가 없습니다.");
    }

    root.innerHTML = matchedRoute.component;
  };

  const push = (path: Route["path"]) => {
    window.history.pushState(null, "", path);
    render();
  };

  const replace = (path: Route["path"]) => {
    window.history.replaceState(null, "", path);
    render();
  };

  const register = () => {
    window.addEventListener("popstate", () => {
      render();
    });

    render();
  };

  register();

  return {
    push,
    replace,
  };
};

const homeRoute = createRoute({
  path: "/",
  component: HomePage(),
});

const counterRoute = createRoute({
  path: "/counter",
  component: CounterPage(),
});

export const routes = [homeRoute, counterRoute];
