const personmessage = () => import("../../views/gerenzhongxin/myselfmenuright/personmessage.vue")

export default {
  path: 'member',
  component: personmessage,
  meta: {
    requireAuth: true
  }
}