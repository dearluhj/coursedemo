const gerenjianjie = () => import("../../views/gerenzhongxin/myselfmenuright/gerenjianjie.vue")
//个人简介下路由组件
const xinxiwanshan = () => import("../../views/gerenzhongxin/myselfmenuright/gerenjianjie/xinxiwanshan.vue")
const kongdangdang = () => import("../../views/gerenzhongxin/myselfmenuright/gerenjianjie/kongdandan.vue")

export default {
  //个人简介
  path: '/',
  component: gerenjianjie,
  children: [{
      //个人简介下信息完善
      path: 'renewal',
      component: xinxiwanshan,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      component: kongdangdang,
      meta: {
        requireAuth: true
      }
    }
  ],
  meta: {
    requireAuth: true
  }
}