// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import Overview from "./pages/OverviewPage.vue";
import Transactions from "./pages/TransactionsPage.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Overview",
        component: Overview,
      },
      {
        path: "transactions",
        name: "Transactions",
        component: Transactions,
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
