import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    isLogin: false,
    token: '',
    currentUsername: '', //用户昵称
  }, 
  mutations: {
    userStatus(state, payload) {
      if (payload.username) {
        state.currentUser = payload.username;
        state.isLogin = true;
        state.token = payload.token;
      } else if (payload.username == '') {
        //退出登录时清空sessionStorage
        sessionStorage.removeItem("userName");
        state.currentUser = '';
        state.isLogin = false;
        state.token = '';
      }
    },
    //修改用户昵称
    changeusername(state, name) {
      state.currentUsername = name ? name : '未设置昵称';
    },
  },
  actions: {
    setUser(context, payload) {
      context.commit({
        type: "userStatus",
        username: payload.username,
        token: payload.token
      });
    },
  },
  getters: {

  }
})