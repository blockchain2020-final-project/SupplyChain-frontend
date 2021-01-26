import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Administrator from './administrator'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'HomeDirect',
    component: () => import('@/views/Home.vue')
  },
  ...Administrator,
  {
    path: '*',
    name: '404-not-found',
    component: () => import('@/views/Components/page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
