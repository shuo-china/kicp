import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getPermissionStore, getUserStore } from '@/store'
import router from '@/router'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = getUserStore()
  const permissionStore = getPermissionStore()
  const { whiteListRouters } = permissionStore

  if (userStore.token) {
    if (to.path === '/login' || userStore.hasUserInfo) {
      next()
    } else {
      try {
        const { roles } = await userStore.getUserInfo()
        await permissionStore.initRoutes(roles)

        next(to.path)
      } catch (error) {
        next({
          path: '/login',
          query: { redirect: encodeURIComponent(to.fullPath) }
        })
      }
    }
  } else {
    /* white list router */
    // eslint-disable-next-line no-lonely-if
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.fullPath) }
      })
    }
  }
})

router.afterEach(to => {
  if (to.path === '/login') {
    const userStore = getUserStore()
    const permissionStore = getPermissionStore()

    userStore.logout()
    permissionStore.restore()
  }

  NProgress.done()
})
