import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import component1 from '@/components/dashboard.vue'
import component2 from '@/components/HomePage.vue'

import AddQuestion from '@/components/AddQuestion.vue'
import Login from '@/components/LoginForm.vue'
import Register from '@/components/RegisterForm.vue'
import oneQuestion from '@/components/OneQuestion.vue'
import AllQuestion from '@/components/AllQuestion.vue'
import WatchedTags from '@/components/WatchedTags.vue'


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',

      component: component1,
      children: [{
        name: 'Login',
        path: '/',
        component: Login
      }, {
        name: 'Register',
        path: '/register',
        component: Register
      }
      ]
    },
    {
      path: '/',
      component: component2,
      children: [{
        path: '',
        component: AllQuestion
      }, {
        path: '/addQuestion',
        component: AddQuestion
      }, {
        path: '/question/:id',
        component: oneQuestion
      }
      ]
    },
    {
      path: '/watchedTags',
      name: 'Page Three',
      component: () => import(/* webpackChunkName: "about" */ '@/components/WatchedTags.vue'),
    },
    // { path: '*', redirect: '/home' }
  ]
})
