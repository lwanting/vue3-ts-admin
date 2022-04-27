import { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = []
export function mapMenuToRouter(menus: any[]): RouteRecordRaw[] {
  const routeFiles = require.context('../router/main', true, /\.ts/)
  const allRoutes = routeFiles.keys().map((item) => {
    return require('../router/main' + item.split('.')[1]).default
  })
  setRouter(menus, allRoutes)
  return router
}

function setRouter(menus: any[], allRoutes: any[]) {
  for (const menu of menus) {
    if (menu.type === 2) {
      const routeRecord = allRoutes.find((item) => item.path === menu.url)
      if (routeRecord) {
        router.push(routeRecord)
      }
    } else {
      setRouter(menu.children, allRoutes)
    }
  }
}
