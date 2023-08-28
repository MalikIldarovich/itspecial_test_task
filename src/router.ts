import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@views/HomePage.vue";
import UsersPage from "@views/UsersPage.vue";
import TextareaPage from "@views/TextareaPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      meta: { layout: "default" },
      component: HomePage,
    },
    {
      path: "/users",
      meta: { layout: "default" },
      component: UsersPage,
    },
    {
      path: "/textarea",
      meta: { layout: "default" },
      component: TextareaPage,
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("./views/NotFoundPage.vue"),
    },
  ],
});
