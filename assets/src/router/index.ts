import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import WordsView from "../views/WordsView.vue";
import Index from "../views/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "app",
    component: WordsView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
