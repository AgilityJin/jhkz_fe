import { RouteConfig } from 'vue-router'
import { mdiCogs, mdiOrderBoolDescending, mdiAccountGroup, mdiCogTransfer, mdiHomeAnalytics, mdiAccountCog, mdiHandshake, mdiSteam } from '@mdi/js'

const main = () => import('~/pages/layouts/main.vue').then(m => m.default || m)
const home = () => import('~/pages/home/index.vue').then(m => m.default || m)
const login = () => import('~/pages/login/index.vue').then(m => m.default || m)
const order = () => import('~/pages/order/index.vue').then(m => m.default || m)
const systemSetting = () => import('~/pages/setting/system/index.vue').then(m => m.default || m)
const rolesSetting = () => import('~/pages/setting/roles/index.vue').then(m => m.default || m)
const usersSetting = () => import('~/pages/setting/users/index.vue').then(m => m.default || m)
const booster = () => import('~/pages/booster/index.vue').then(m => m.default || m)
const gameCategoriesSetting = () => import('~/pages/setting/game-categories/index.vue').then(m => m.default || m)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      name: '首页',
      icon: mdiHomeAnalytics
    }
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      name: '订单管理',
      auth: 'order',
      icon: mdiOrderBoolDescending
    }
  },
  {
    path: '/booster',
    name: 'booster',
    component: booster,
    meta: {
      name: '代练管理',
      icon: mdiHandshake,
      hidden: true
    }
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      name: '设置',
      auth: 'setting',
      icon: mdiCogs
    },
    component: main,
    children: [{
      path: 'game-categories',
      name: 'gameCategoriesSetting',
      component: gameCategoriesSetting,
      meta: {
        name: '游戏类目',
        auth: 'setting-game-categories',
        icon: mdiSteam
      }
    }, {
      path: 'roles',
      name: 'rolesSetting',
      component: rolesSetting,
      meta: {
        name: '角色管理',
        auth: 'setting-roles',
        icon: mdiAccountGroup
      }
    }, {
      path: 'users',
      name: 'usersSetting',
      component: usersSetting,
      meta: {
        name: '用户管理',
        auth: 'setting-users',
        icon: mdiAccountCog
      }
    }, {
      path: 'system',
      name: 'systemSetting',
      component: systemSetting,
      meta: {
        name: '系统设置',
        auth: 'setting-system',
        icon: mdiCogTransfer
      }
    }]
  }
]
