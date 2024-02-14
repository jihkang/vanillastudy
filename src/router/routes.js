export const defaultRoutes = () => {
  let routes = [];

  const getCorrectRoutes = (path) => {
    const result = routes.find((route) => {
      if (route.path === path) {
        return route;
      }
      const splitRoute = route.path.split("/");
      const splitPath = path.split("/");
      if (splitRoute.length !== splitPath.length) {
        return false;
      }
      if (route.path.includes(":")) {
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

  const createRoutes = (exportRoutes, defaultPath = "", depths = 0) => {
    return exportRoutes
      .map((route) => {
        let params;
        const splitRoute = route.path.split("/");
        if (route.path.includes(":")) {
          const temp = {};
          temp.path = route.path.split(":")[1].split("/")[0];
          temp.index = depths;
          params = { ...temp };
        }
        if (route.children) {
          return [
            {
              params,
              element: route.element,
              path: defaultPath + route.path + "/",
            },
            ...createRoutes(
              route.children,
              defaultPath + route.path + "/",
              depths + 1
            ),
          ];
        }
        return {
          ...route,
          params,
          path: defaultPath + route.path,
          depths,
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
