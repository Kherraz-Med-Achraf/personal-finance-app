// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import Home from "./pages/HomePage.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "transactions",
        name: "Transactions",
        component: Home,
      },
      // {
      //   path: "settings",
      //   name: "Settings",
      //   component: Settings,
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
