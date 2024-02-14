export const defaultRoutes = () => {
  let routes = [];

  const getCorrectRoutes = (path) => {
    const result = routes.filter((route) => {
      if (route.path === path) {
        return route;
      } else if (route.path.includes(":")) {
        const splitRoute = route.path.split("/");
        const splitPath = path.split("/");
        if (splitRoute.length !== splitPath.length) return false;
        return splitRoute.every((routePath, i) => {
          if (routePath.includes(":")) {
            return true;
          }
          return routePath == splitPath[i];
        });
      }
    });
    return result;
  };

  const createRoutes = (exportRoutes, defaultPath = "") => {
    if (defaultPath !== "") console.log(defaultPath);
    return exportRoutes
      .map((route) => {
        if (route.children) {
          return [
            {
              element: route.element,
              path: defaultPath + route.path + "/",
            },
            ...createRoutes(route.children, defaultPath + route.path + "/"),
          ];
        }
        return {
          ...route,
          path: defaultPath + route.path,
        };
      })
      .flat();
  };
  const createDefaultRoutes = (router) => {
    routes = createRoutes(router);
  };

  return {
    createDefaultRoutes,
    getCorrectRoutes,
  };
};

/**
 * {
 *   path: 'home',
 *   component: <></>
 *   children: []
 * }
 * {
 *
 * }
 */
