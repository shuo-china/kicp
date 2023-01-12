import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import router, { asyncRouterList } from '@/router'
import { store } from '@/store'

function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<string>) {
  const res = []
  const removeRoutes = []

  routes.forEach(route => {
    const accessRoles = route.meta?.roles
    if (accessRoles) {
      if (roles.some(role => accessRoles.includes(role))) {
        res.push(route)
      } else {
        removeRoutes.push(route)
      }
    } else {
      res.push(route)
    }
  })

  return { accessedRouters: res, removeRoutes }
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: []
  }),
  actions: {
    async initRoutes(roles: Array<string>) {
      let accessedRouters = []

      let removeRoutes = []

      const res = filterPermissionsRouters(asyncRouterList, roles)

      accessedRouters = res.accessedRouters
      removeRoutes = res.removeRoutes

      this.routers = accessedRouters
      this.removeRoutes = removeRoutes

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name)
        }
      })
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
      this.$reset()
    }
  }
})

export function getPermissionStore() {
  return usePermissionStore(store)
}
