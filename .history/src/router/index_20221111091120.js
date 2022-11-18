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
import index from '@/components/user/index'

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
          component: Index,
        },
        {
          path: '/main/shiguan',
          component: shiguan,
        },
        {
          path: '/main/sysuser',
          component: SystemUser,
        },
        {
          path: '/main/renwu',
          component: rewu,
        },
        {
          path: '/main/jiance',
          component: jiance,
        },
        {
          path: '/main/renyuan',
          component: renyuan,
        },
      ]
    },
    {
      path: '/operator',
      redirect: '/operator/login'
    },
    {
      path: '/login',
      name: login,
      component: login
    },
    {
      path: '/user',
      component: () => import('../components/user/index.vue'),
      meta: { title: '用户首页' }
    },
    {
      path: '/user/info',
      component: () => import('../components/user/userInfo.vue'),
      meta: { title: '个人信息登记' }
    },
    {
      path: '/user/search',
      component: () => import('../components/user/search.vue'),
      meta: { title: '检测结果查询' }
    }, {
      path: '/user/info/view',
      component: () => import('../components/user/infoView.vue'),
      meta: { title: '个人信息详情' }
    }, {
      path: '/user/info/edit',
      component: () => import('../components/user/infoEdit.vue'),
      meta: { title: '个人信息编辑' }
    },
    {
      path: '/operator/index',
      component: () => import('../components/operator/index.vue'),
      meta: { title: '分组扫码' }
    }, {
      path: '/operator/login',
      component: () => import('../components/operator/login.vue'),
      meta: { title: '采集登陆' }
    }, {
      path: '/operator/selectjob',
      component: () => import('../components/operator/selectJob.vue'),
      meta: { title: '采集任务选择' }
    },


  ]
})
