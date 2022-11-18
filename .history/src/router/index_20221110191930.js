import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/admin/login'
import main from '@/components/admin/common/main'
import Index from '@/components/admin/Index'
import shiguan from '@/components/admin/shiguan'
import SystemUser from '@/components/admin/SystemUser'
import rewu from '@/components/admin/rewu'
import jiance from '@/components/admin/ResultTable'
import renyuan from '@/components/admin/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: main,
      component: main,
      children: [
        {
          path: '/',
          component:Index,
        },
        {
          path: '/main/shiguan',
          component:shiguan,
        },
        {
          path: '/main/sysuser',
          component:SystemUser,
        },
        {
          path: '/main/renwu',
          component:rewu,
        },
        {
          path: '/main/jiance',
          component:jiance,
        },
        {
          path: '/main/renyuan',
          component:renyuan,
        },
      ]
    },
    {
      path: '/login',
      name: login,
      component: login
    },
    {
      path: '/user',
      name: login,
      redirect: login
    },


  ]
})
