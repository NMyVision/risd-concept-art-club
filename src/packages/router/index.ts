import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized, type RouteLocationNormalizedLoaded, type RouteMeta } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { useUserStore } from "../stores/user";

routes.push({
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  redirect: "/not-found",
});
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // @ts-ignore
  routes: routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
  const { isAuthenticated } = storeToRefs(useUserStore());
  if (import.meta.env.DEV) {
    console.groupCollapsed("router.beforeEach");
    console.table({
      isAuthenticated: toValue(isAuthenticated),
      to: toValue(to.fullPath),
      toName: toValue(to.name),
      meta: JSON.stringify(to.meta, null, 2),
      from: toValue(from.fullPath),
      fromName: toValue(from.name),
      public: to.meta.public,
    });
    console.groupEnd();
  }

  // default state for all pages is 'private'
  const access : RouteMeta["access"] = to.meta.access || "private";

  if (! toValue(isAuthenticated) && access !== "public")
  {
    if (to.name === '/login') return next(); //shortcircuit if already heading to login

    return next('/login')
  }

  if ( toValue(isAuthenticated) && access === "anonymous"  )
  {
    return next('/about')
  }

  return next(); // go where they want to go
});

export default router;
