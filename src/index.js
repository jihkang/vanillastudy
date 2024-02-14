import { defaultRoutes } from "./router/routes.js";

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
          {
            path: ":test",
            component: "Test",
          },
          {
            path: "rr",
            component: "RR",
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
        children: [
          {
            path: "world",
            component: "World",
          },
          {
            path: "rr",
            component: "RR",
          },
        ],
      },
    ],
  },
]);
// console.log(routes.getCorrectRoutes("hi/hello/test"));

window.addEventListener("hashchange", () => {
  window.location.hash;
  console.log(
    `result:`,
    routes.getCorrectRoutes(window.location.hash.replace("#", ""))
  );
});
