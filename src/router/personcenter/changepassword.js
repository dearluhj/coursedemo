const password = () => import("../../views/gerenzhongxin/myselfmenuright/xiugaimima.vue");

export default {
  path: 'password',
  component: password,
  meta: {
    requireAuth: true
  }
}