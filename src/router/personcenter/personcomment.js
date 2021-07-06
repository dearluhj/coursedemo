const comment = () => import("../../views/gerenzhongxin/myselfmenuright/personremark.vue")

export default {
  path: 'personcomment',
  component: comment,
  meta: {
    requireAuth: true
  }
}