import { CounterPage } from "../pages/counter";
import { HomePage } from "../pages/home";

const PopStateEventType = "popstate";

type To = string;

type RouterNavigateOptions = {
  replace?: boolean;
};

type NavigateFunction = (to: To, opts?: RouterNavigateOptions) => void;

type DataRouter = {
  navigate: NavigateFunction;
};

type Route = {
  path: string;
  component: string;
};

export const createBrowserRouter = (
  routes: Route[],
  root: HTMLElement
): DataRouter => {
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

  const push = (to: To) => {
    window.history.pushState(null, "", to);
    render();
  };

  const replace = (to: To) => {
    window.history.replaceState(null, "", to);
    render();
  };

  const navigate: NavigateFunction = (to, opts) => {
    if (opts?.replace) {
      replace(to);
    } else {
      push(to);
    }
  };

  const listen = () => {
    window.addEventListener(PopStateEventType, () => {
      render();
    });
  };

  listen();
  render();

  return {
    navigate,
  };
};

export const routes = [
  {
    path: "/",
    component: HomePage(),
  },
  {
    path: "/counter",
    component: CounterPage(),
  },
];
