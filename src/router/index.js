import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui'

const shouye = () => import('../views/shouye/shouye.vue')
const ziyuanzonglan = () => import('../views/ziyuandaohang/gross.vue')
const myself = () => import('../views/gerenzhongxin/myself.vue')
const shoucang = () => import('../views/gerenzhongxin/collection.vue')
const liuyanbang = () => import('../views/liuyanbang/comment.vue')
const register = () => import('../views/zhuce/register.vue')
const changeword = () => import('../views/zhuce/changeword.vue')
const learning = () => import('../views/learnview/learning.vue')
const necess = () => import("../components/necess.vue")
const footer = () => import("../components/common/footer.vue")

//个人中心页面下子路由
import personmessage from "./personcenter/personmessage.js"
import gerenjianjie from "./personcenter/gerenjianjie.js"
import avatar from "./personcenter/avatar.js"
import password from "./personcenter/changepassword.js"
import personcomment from "./personcenter/personcomment.js"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  //主页
  {
    path: '/home',
    name: 'home',
    components: {
      viewtop: necess,
      viewmain: shouye,
      viewbottom: footer
    },
    meta: {
      requireAuth: false
    }
  },
  //资源总览
  {
    path: '/resource',
    name: 'resource',
    components: {
      viewtop: necess,
      viewmain: ziyuanzonglan,
      viewbottom: footer
    },
    meta: {
      requireAuth: false
    }
  },
  //个人中心
  {
    path: '/personcenter',
    name: 'personcenter',
    components: {
      viewtop: necess,
      viewmain: myself,
      viewbottom: footer
    },
    //个人中心下子路由
    children: [
      gerenjianjie,
      //个人信息
      personmessage,
      //修改头像
      avatar,
      //修改密码
      password,
      //个人评论
      personcomment
    ],
    meta: {
      requireAuth: true
    },
  },
  //收藏课程
  {
    path: '/course',
    name: 'course',
    components: {
      viewtop: necess,
      viewmain: shoucang,
      viewbottom: footer
    },
    meta: {
      requireAuth: true
    }
  },
  //留言板
  {
    path: '/comment',
    name: 'comment',
    components: {
      viewtop: necess,
      viewmain: liuyanbang,
      viewbottom: footer
    },
    meta: {
      requireAuth: false
    }
  },
  //注册页面
  {
    path: '/register',
    name: 'register',
    components: {
      viewmain: register
    },
    meta: {
      requireAuth: false
    }
  },
  //密码修改
  {
    path: '/changeuserword',
    name: 'changeuserword',
    components: {
      viewmain: changeword
    },
    meta: {
      requireAuth: false
    }
  },
  //学习页面
  {
    path: '/learning/:id',
    name: 'learning',
    components: {
      viewtop: necess,
      viewmain: learning,
      viewbottom: footer
    },
    meta: {
      requireAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userName')) { //判断本地是否存在用户登录数据
      next();
    } else {
      if (to.path === '/home') {
        next();
      } else {
        //返回到主页
        Message({
          type: 'warning',
          message: '您还未登录，请先登录或注册账号'
        })
        next({
          path: '/home'
        })
      }
    }
  } else {
    next();
  }
  /*如果本地存在登录数据 则不允许直接跳转到 注册页面*/
  if (to.fullPath == "/register") {
    if (sessionStorage.getItem('userName')) {
      Message({
        type: 'info',
        message: '您已登录'
      })
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }

  //如果用户已登录则无法跳转到忘记密码界面
  if (to.fullPath == "/changeuserword") {
    if (sessionStorage.getItem('userName')) {
      Message({
        type: 'info',
        message: '您已登录'
      })
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
export default router