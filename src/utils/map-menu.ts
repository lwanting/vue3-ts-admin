import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'

const router: RouteRecordRaw[] = []
let firstMenu: any = null
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
      if (!firstMenu) {
        firstMenu = menu
      }
    } else {
      setRouter(menu.children, allRoutes)
    }
  }
}

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapPathToBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  mapPathToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export { firstMenu }
