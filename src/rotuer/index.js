import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: {
      name: 'Index'
    }
  }, {
    name: 'Index',
    path: '/index',
    component: Index
  }, {
    name: 'Login',
    path: '/login',
    component: Login
  }]
})
export default router
