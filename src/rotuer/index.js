import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import Welcome from '@/pages/children/welcome.vue'
import Postlist from '@/pages/children/postlist.vue'
import Articleissue from '@/pages/children/articleissue.vue'

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
    component: Index,
    redirect: {
      name: 'Welcome'
    },
    children: [{
      name: 'Welcome',
      path: 'welcome',
      component: Welcome
    }, {
      name: 'Postlist',
      path: 'postlist',
      component: Postlist
    }, {
      name: 'Articleissue',
      path: 'articleissue',
      component: Articleissue
    }]
  }, {
    name: 'Login',
    path: '/login',
    component: Login
  }]
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('heima_back_token')) {
      next()
    } else {
      Vue.prototype.$message.error({
        showClose: true,
        message: '请先登录'
      })
      next({
        path: '/login'
      })
    }
  }
})
export default router
