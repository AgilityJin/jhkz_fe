import { RouteConfig } from 'vue-router'

const Home = () => import('~/pages/home/index.vue').then(m => m.default || m)
const UserCenter = () => import('~/pages/user-center/index.vue').then(m => m.default || m)
const MyOrder = () => import('~/pages/my-order/index.vue').then(m => m.default || m)
const User = () => import('~/pages/user/index.vue').then(m => m.default || m)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user-center',
    name: 'userCenter',
    component: UserCenter,
    redirect: '/user-center/my-order',
    children: [
      {
        path: 'my-order',
        name: 'userCenterMyOrder',
        component: MyOrder
      },
      {
        path: 'user',
        name: 'userCenterUser',
        component: User
      }
    ]
  }
]
