import { RouteConfig } from 'vue-router'

const home = () => import('~/pages/home/index.vue').then(m => m.default || m)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]
