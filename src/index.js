import { defaultRoutes } from "./router/routes.js";

window.onload = () => {
  const routes = defaultRoutes();
  routes.createDefaultRoutes([
    {
      path: "hi",
      children: [
        {
          path: "hello",
          component: "Hello",
          children: [
            {
              path: "world",
              component: "World",
            },
          ],
        },
        {
          path: "bye",
          component: "Bye",
        },
        {
          path: ":id",
          component: "ID",
        },
      ],
    },
  ]);
  console.log(routes.getCorrectRoutes("hi/hello/world"));
};
