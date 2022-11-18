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
import LogView from '@/components/admin/log.vue'


Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:login,
      component:login,
    },
    {
      path: '/main',
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
        {
          path: '/main/log',
          component: () => import('../components/admin/log.vue'),
          meta: { title: '系统日志' }
        },
      ]
    },
    
    {
      path: '/operator',
      redirect: '/operator/login'
    },
    {
      path: '/user',
      component: () => import('../components/user/login.vue'),
      meta: { title: '用户登录' }
    },
    {
      path: '/user/index',
      component: () => import('../components/user/index.vue'),
      meta: { title: '用户首页' }
    },
    {
      path: '/user/register',
      component: () => import('../components/user/register.vue'),
      meta: { title: '用户注册' }
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
    },{
      path: '/code',
      component: LogView,
      meta: { title: '生成试管二维码' }
    },


  ]
})

router.beforeEach((to, Form, next) => {
  if (to.path === "/main"){
    let token=localStorage.getItem("systemuser");
    if(token ===null || token===""){
      next("/");
    }else{
      next()
    }
  }else{
    next();
  }
})

export default router
