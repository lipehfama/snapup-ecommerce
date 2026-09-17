import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // home page route
      path: "/",
      name: "home",
      component: Home
    },
    // single product route
    {
      path: "/product/:id",
      name: "product",
      component: () => import("@/views/ProductSingle/ProductSingle.vue")
    },
    // category wise product listing route
    {
      path: "/category/:category",
      name: "category",
      component: () => import("@/views/CategoryProduct/CategoryProduct.vue")
    },
    // cart
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart/Cart.vue")
    },
    // searched products
    {
      path: "/search/:searchTerm",
      name: "search",
      component: () => import("@/views/Search/Search.vue")
    },
    {
      path: "/support",
      name: "support",
      component: () => import("@/views/Support/Support.vue")
    },
    {
      path: "/download",
      name: "download",
      component: () => import("@/views/Download/Download.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register/Register.vue")
    }
  ]
});
