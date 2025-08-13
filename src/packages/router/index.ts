import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // @ts-ignore
  routes: routes
})

router.beforeEach((to: any, from: any, next: any) => {

  if (import.meta.isDevelopment) {
    console.groupCollapsed('router.beforeEach')
    console.table({
    to: toValue(to.fullPath),
    toName: toValue(to.name),
    from: toValue(from.fullPath),
    fromName: toValue(from.name),
      public: to.meta.public
    })
    console.groupEnd()
  }

  return next() // go where they want to go
})

export default router
