<template>
  <div id="tabbar">
    <header class="head2-top">
      <div class="head2-div">
        <div>
          <img src="../../assets/img/logo/justlogo.gif" />
          <img src="../../assets/img/logo/logo.png" />
          <ul>
            <li :class="isActive('/home')" @click="tolink(shouye)">首页</li>
            <li :class="isActive('/resource')" @click="tolink(ziyuanzonglang)">
              资源总览
            </li>
            <li :class="isActive('/comment')" @click="tolink(liuyanbang)">
              留言板
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li v-show="!islogin" ref="login">登录/注册</li>
            <div class="dropdown">
              <li
                v-show="islogin"
                class="glyphicon glyphicon-education btn dropdown-toggle"
                id="dropdownMenu1"
                data-toggle="dropdown"
              ></li>
              <li class="username" ref="username" v-show="islogin">
                {{ $store.state.currentUser }}
              </li>
              <ul
                class="dropdown-menu dropdown-menu-right"
                style="min-width: 100px"
                role="menu"
                aria-labelledby="dropdownMenu1"
              >
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" @click="tolink(myself)"
                    >个人中心</a
                  >
                </li>
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" @click="tolink(collection)"
                    >收藏课程</a
                  >
                </li>
                <li role="presentation" class="divider"></li>
                <li role="presentation">
                  <a ref="exitlogin" role="menuitem" tabindex="-1">退出登录</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>

      <login class="login" ref="enroll"></login>
    </header>
  </div>
</template>

<script>
import login from "../../views/zhuce/login.vue";

export default {
  created() {
    //判断登录状态
    if (sessionStorage.getItem("userName")) {
      this.$store.dispatch({
        type: "setUser",
        username: sessionStorage.getItem("userName"),
        token: sessionStorage.getItem("token"),
      });
    }
  },
  mounted() {
    this.$refs.login.addEventListener("click", () => {
      this.$refs.enroll.$refs.login.style.display = "block";
    });

    this.$refs.exitlogin.addEventListener("click", () => {
      this.$msgbox
        .confirm("即将退出登录，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          //清空登录数据
          this.$store.dispatch({
            type: "setUser",
            username: "",
            token: "",
          });
          this.$router.push("/home").catch((err) => {});
          this.$message({
            type: "success",
            message: "您已退出登录",
          });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "操作已取消",
          });
        });
    });
  },
  data() {
    return {
      shouye: "/home",
      ziyuanzonglang: "/resource",
      liuyanbang: "/comment",
      myself: "/personcenter",
      collection: "/course",
    };
  },
  components: {
    login,
  },
  methods: {
    tolink(link) {
      // console.log(link);
      this.$router.push(link).catch((err) => {});
    },
    isActive(link) {
      return this.isActiveroute.indexOf(link) !== -1
        ? { "li-click": true }
        : {};
    },
  },
  computed: {
    islogin() {
      return this.$store.state.isLogin;
    },
    isActiveroute() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.head2-top {
  position: sticky;
  z-index: 5;
  top: 0px;
  left: 0px;
  width: auto;
  height: 50px;
  background-color: #ffffff;
  border-bottom: #cbcbcb 1px solid;
  box-shadow: 0 1px 5px #bababa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.head2-top .head2-div {
  width: 1300px;
  height: 100%;
  display: flex;
}

.head2-top .head2-div > div:first-child {
  display: flex;
  justify-content: flex-start;
  width: 600px;
  margin-right: auto;
}

.head2-top .head2-div img:nth-of-type(1) {
  height: 70px;
  margin: -15px;
}

.head2-top .head2-div img:nth-of-type(2) {
  height: 20px;
  margin-top: 15px;
  margin-right: auto;
}

.head2-top .head2-div > div:first-child ul {
  list-style: none;
  width: 350px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: 200;
  color: #4d514a;
  text-align: center;
}

.head2-top .head2-div > div > ul > li {
  width: 100px;
  cursor: pointer;
}

.head2-top .head2-div > div:last-child > ul {
  list-style: none;
  display: flex;
  width: 180px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 200;
  text-align: center;
}

.head2-top .head2-div > div:last-child .dropdown > li {
  font-size: 25px;
}
.head2-top .head2-div > div:last-child .dropdown {
  display: flex;
  align-items: center;
}
.head2-top .head2-div > div:last-child .dropdown .username {
  font-size: 20px;
  height: 30px;
  background-color: #e7e7e7c0;
  box-shadow: 0 0 5px #c9c9c9;
  border-radius: 5px;
}

.li-click::after {
  content: "";
  display: block;
  width: 100px;
  height: 2px;
  background-color: #5bbc00;
  position: relative;
  top: 13px;
  animation-name: liclick;
  animation-duration: 0.5s;
}

@keyframes liclick {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.foot-menu {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  box-shadow: 0 0 5px #9f9f9f;
}

.head2-top > .login {
  display: none;
}
</style>
