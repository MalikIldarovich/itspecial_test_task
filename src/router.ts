import { createRouter, createWebHistory } from "vue-router";
import Home from "@views/HomePage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      meta: { layout: "default" },
      component: Home,
    },
    {
      path: "/users",
      meta: { layout: "default" },
      component: () => import("./views/UsersPage.vue"),
    },
    {
      path: "/textarea",
      meta: { layout: "default" },
      component: () => import("./views/TextareaPage.vue"),
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("./views/NotFoundPage.vue"),
    },
  ],
});
