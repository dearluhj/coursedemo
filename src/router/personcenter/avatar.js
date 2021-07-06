const xiugaitouxiang = () => import("../../views/gerenzhongxin/myselfmenuright/xiugaitouxiang.vue")

export default {
  path: 'avatar',
  component: xiugaitouxiang,
  meta: {
    requireAuth: true
  }
}