<template>
  <div id="myself">
    <main class="main-menu moderate">
      <div class="menu-left">
        <div class="left-div1">
          <div class="userhead">
            <img
              ref="touxiang"
              :src="imgurl"
              alt=""
              onerror="this.src='http://127.0.0.1/Justdoit/userhead/img/default.jpg'"
            />
          </div>
          <div class="username">
            <p>{{ username }}</p>
          </div>
          <div class="perfection">
            <span>个人资料完善</span>
            <i
              class="glyphicon glyphicon-pencil"
              @click="tolink('/renewal')"
            ></i>
          </div>
        </div>
        <div class="left-div2">
          <div class="gerenjianjie" @click="tolink('')">
            <i class="glyphicon glyphicon-pushpin"></i><span>个人简介</span>
          </div>
          <div class="per-message" @click="tolink('/member')">
            <i class="glyphicon glyphicon-user"></i><span>个人信息</span>
          </div>
          <div class="xiugaitouxiang" @click="tolink('/avatar')">
            <i class="glyphicon glyphicon-picture"></i><span>修改头像</span>
          </div>
          <div class="xiugaimima" @click="tolink('/password')">
            <i class="glyphicon glyphicon-eye-open"></i><span>修改密码</span>
          </div>
          <div class="checkremark" @click="tolink('/personcomment')">
            <i class="glyphicon glyphicon-list-alt"></i><span>个人评论</span>
          </div>
        </div>
        <div class="left-div3">
          <p>功能开发中~</p>
        </div>
      </div>

      <div class="box-right">
        <transition :name="transitionname" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";
import gerenjianjie from "./myselfmenuright/gerenjianjie.vue";

export default {
  components: {
    gerenjianjie,
  },
  data() {
    return {
      transitionname: "slide-child",
      path: "",
    };
  },
  methods: {
    tolink(link) {
      this.$router.push(this.path + link).catch((err) => {});
    },
  },
  computed: {
    username() {
      return this.$store.state.currentUsername;
    },
    imgurl() {
      return (
        "http://127.0.0.1/Justdoit/userhead/img/" +
        this.$store.state.currentUser +
        ".jpg?rang="+Math.random()
      );
    },
  },
  mounted() {},
  created() {
    //初始路径
    this.path = "/personcenter";

    instance({
      method: "post",
      url: "/Justdoit/user/permessage.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
      }),
    }).then((res) => {
      if (res.data) {
        this.$store.commit("changeusername", res.data[0]["u_name"]);
      } else {
        this.$message({
          type: "error",
          message: "Servers error!",
        });
      }
    });
  },
};
</script>

<style scoped>
#myself .main-menu {
  width: 1000px;
  height: 100%;
  margin-top: 50px;
  display: flex;
}
#myself .main-menu .box-right {
  flex-grow: 2;
  margin-left: 30px;
}
#myself .main-menu .menu-left {
  width: 320px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
}
#myself .main-menu .menu-left > div {
  box-shadow: 0 0 5px #acacac;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #ffffff88;
}
#myself .main-menu .menu-left > .left-div1 {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#myself .main-menu .menu-left > .left-div2 {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#myself .main-menu .menu-left > .left-div3 {
  height: auto;
  max-height: 200px;
  flex-grow: 1;
}
#myself .main-menu .menu-left > .left-div3 p {
  color: #02020228;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  line-height: 5em;
}
#myself .main-menu .menu-left .left-div1 .userhead {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #b5eb12;
  overflow: hidden;
  margin-top: 20px;
}
#myself .main-menu .menu-left .left-div1 .userhead > img {
  width: 150px;
  height: 150px;
}
#myself .main-menu .menu-left .left-div1 .username {
  color: #7a7a7a;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  height: 30px;
  text-align: center;
}
#myself .main-menu .menu-left .left-div1 .perfection {
  border-top: 1px solid #89898981;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #a2a2a2;
  margin-top: 20px;
  font-weight: 600;
}
#myself .main-menu .menu-left .left-div1 .perfection > i {
  margin-top: 20px;
  margin-left: 10px;
  color: #dda900;
  cursor: pointer;
}
#myself .main-menu .menu-left .left-div1 .perfection > i:hover {
  transform: scale(1.5);
}
#myself .main-menu .menu-left .left-div2 > div {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
#myself .main-menu .menu-left .left-div2 > div:hover {
  background-color: #91919118;
  box-shadow: 0 0 5px #b8b8b8;
}
#myself .main-menu .menu-left .left-div2 > div:hover > span,
#myself .main-menu .menu-left .left-div2 > div:hover > i {
  transform: scale(1.1);
}
#myself .main-menu .menu-left .left-div2 > div > span {
  color: #7a7a7aa9;
  font-size: 18px;
  font-weight: 600;
}
#myself .main-menu .menu-left .left-div2 > div > i {
  margin-right: 20px;
  font-size: 20px;
  color: #8dc00083;
}
</style>