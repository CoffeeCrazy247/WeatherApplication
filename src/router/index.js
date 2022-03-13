import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/weather',
    name: 'Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Weather.vue')
  },
  {
    path: '/3dfuntest',
    name: '3dFunTest',
    component: () => import(/* webpackChunkName: "about" */ '../views/3dFunTest.vue')
  },
  {
    path: '/matrix',
    name: 'Matrix',
    component: () => import(/* webpackChunkName: "about" */ '../views/Matrix.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
