import { fireAuth } from "@/firebase";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Routes from "@/router/approutes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: Routes.Home,
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: Routes.Register,
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: Routes.Signin,
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  },
  {
    path: Routes.Create,
    name: "create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !fireAuth.currentUser) {
    next(Routes.Signin);
  } else {
    next();
  }
});

export default router;
