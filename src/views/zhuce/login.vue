<template>
  <div id="enroll" ref="login">
    <div class="content">
      <i class="glyphicon glyphicon-remove" ref="cancel"></i>
      <div>
        <p>请先登录</p>
      </div>
      <div ref="duname" class="d-uname">
        <input
          ref="uname"
          value=""
          class="uname"
          type="text"
          placeholder="请输入用户账号"
        />
      </div>
      <div ref="duword" class="d-uword">
        <input
          ref="uword"
          value=""
          class="uword"
          type="password"
          placeholder="请输入密码"
        />
        <i ref="onoff" class="glyphicon glyphicon-eye-close"></i>
      </div>
      <div ref="dumail" class="d-umail">
        <input ref="loginyanzhengma" type="text" placeholder="请输入验证码" />
        <img ref="imgyanzheng" src="" alt="" />
      </div>
      <div class="forget">
        <p @click="tolink('/changeuserword')">忘记密码?</p>
      </div>
      <div class="butn">
        <button ref="logindenlu">登录</button>
        <button @click="tolink('/register')">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  mounted() {
    this.$refs.cancel.addEventListener("click", () => {
      this.$refs.login.style.display = "none";
    });

    //密码显示与隐藏
    let ionoff = true;
    this.$refs.onoff.addEventListener("click", () => {
      if (ionoff) {
        this.$refs.uword.type = "text";
        this.$refs.onoff.className = "glyphicon glyphicon-eye-open";
        ionoff = !ionoff;
      } else {
        this.$refs.uword.type = "password";
        this.$refs.onoff.className = "glyphicon glyphicon-eye-close";
        ionoff = !ionoff;
      }
    });

    // 发送数据

    //未配置请求头时发送的数据格式
    // let params = new URLSearchParams();
    // params.append('name','aiyaya');
    //判断文本框是否为空值，否则发送数据请求
    this.$refs.logindenlu.addEventListener("click", () => {
      //去除错误信息
      this.$refs.duname.classList.remove("null-name");
      this.$refs.duword.classList.remove("null-word");
      this.$refs.dumail.classList.remove("null-verify");
      this.$refs.dumail.classList.remove("err-verify");
      this.$refs.duname.classList.remove("nameword-err");

      //若为空则输出错误信息
      if (!this.$refs.uname.value) {
        this.$refs.duname.classList.add("null-name");
      }
      if (!this.$refs.uword.value) {
        this.$refs.duword.classList.add("null-word");
      }

      //当用户名和密码都不为空时执行以下
      if (this.$refs.uname.value && this.$refs.uword.value) {
        //判断验证码，若为空输出错误信息
        if (!this.$refs.loginyanzhengma.value) {
          this.$refs.dumail.classList.add("null-verify");
        } else {
          //判断验证码输入是否正确，否则终止发送请求
          if (
            this.$refs.loginyanzhengma.value.toLowerCase() ===
            this.codelog.toLowerCase()
          ) {
            instance({
              method: "post",
              url: "/Justdoit/login/login.php",
              // url:'/vacationsys_/container/php/stafftable.php',
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              // data:params
              data: qs.stringify({
                username: this.$refs.uname.value,
                password: this.$refs.uword.value,
              }),
            })
              .then((res) => {
                if (res.data) {
                  sessionStorage.setItem("userName", res.data[0]);
                  sessionStorage.setItem("token", res.data[1]);
                  this.$store.dispatch({
                    type: "setUser",
                    username: res.data[0],
                    token: res.data[1],
                  });
                  this.$refs.login.style.display = "none";
                  this.$message({
                    type: "success",
                    message: "登录成功",
                  });
                  this.$router.go(0);
                } else {
                  this.$refs.duname.classList.add("nameword-err");
                  this.$message({
                    type: "warning",
                    message: "用户不存在或密码有误，请重新输入",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
            //请求完成后刷新验证码
            this.yanzhengma();
            this.$refs.loginyanzhengma.value = "";
          } else {
            //输出错误信息
            this.$refs.dumail.classList.add("err-verify");
            this.$refs.loginyanzhengma.value = "";

            this.$message({
              type: "error",
              message: "验证码有误，请重新输入",
            });
            //刷新验证码
            this.yanzhengma();
          }
        }
      }
    });

    //刷新验证码
    let yanzhengma2 = this.yanzhengma.bind(this);
    this.$refs.imgyanzheng.addEventListener("click", yanzhengma2);
  },
  created() {
    //组件初始化时自动加载验证码
    this.yanzhengma();
  },
  data() {
    return {
      //保存验证码
      codelog: "",
    };
  },
  methods: {
    tolink(url) {
      this.$router.push(url).catch((err) => {});
      this.$refs.login.style.display = "none";
    },
    //获取并刷新验证码函数
    yanzhengma() {
      instance({
        method: "post",
        url: "/Justdoit/login/verify/verify.php",
        responseType: "arraybuffer",
        headers: {
          Authorization: localStorage.getItem("access_token") || "",
        },
      })
        .then((res) => {
          //获取验证码值
          instance({
            method: "post",
            url: "/Justdoit/login/verify/codeemit.php",
          }).then((res) => {
            this.codelog = String(res.data);
          });

          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((res) => {
          //加载验证码图片
          this.$refs.imgyanzheng.src = res;
        });
    },
  },
};
</script>

<style scoped>
#enroll {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;
}
#enroll > div {
  width: 350px;
  height: 450px;
  background-color: #f9f9f9;
  border-radius: 5px;
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translateX(-50%) translateY(-50%);
}
#enroll > div > i {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 20;
  cursor: pointer;
}
a:hover,
a {
  color: #3c7ce8;
  text-decoration: none;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content .d-uword,
.content .d-uname,
.content .d-umail {
  position: relative;
  overflow: hidden;
}
.content .uname,
.content .uword {
  margin: 15px 0;
  border-radius: 5px;
  width: 220px;
  height: 35px;
  border: 1px solid #bfbfbf;
  padding: 0 20px 0 5px;
}
.content .d-umail {
  width: 220px;
}
.content .d-umail input {
  border-radius: 5px;
  margin: 15px 0;
  width: 110px;
  height: 35px;
  border: 1px solid #bfbfbf;
  padding: 0 20px 0 5px;
}
.content .d-umail input::placeholder {
  opacity: 0.5;
}
.content .d-uword::before,
.content .d-uname::before {
  content: "";
  position: absolute;
  left: 0;
  height: 2px;
  bottom: 15px;
  width: 100%;
  background: linear-gradient(
    to right,
    white,
    #1abc9c,
    #f1c40f,
    #e74c3c,
    white
  );
  transform: translateX(-100%);
  transition: 2s;
}
.content .d-uname:hover::before,
.content .d-uword:hover::before {
  transform: translateX(100%);
}

.content .uname::-webkit-input-placeholder,
.content .uword::-webkit-input-placeholder {
  opacity: 0.5;
}
.content .uname::-moz-placeholder,
.content .uword::-moz-placeholder {
  opacity: 0.5;
}
.content .uword + i {
  position: absolute;
  right: 5px;
  top: 25px;
  opacity: 0.5;
  cursor: pointer;
}

.content .uname:focus,
.content .uword:focus,
.content .d-umail input {
  outline: 0;
}
.content .forget {
  width: 220px;
}
.content .forget p {
  float: right;
  width: 70px;
  color: #0072fd;
  cursor: pointer;
}
.content .forget p:hover {
  color: #0052b7;
}
.content .butn button {
  margin: 10px 5px;
  border-radius: 5px;
  background-color: #d0e927;
  border: 0;
  color: white;
  font-weight: 600;
  width: 80px;
  height: 35px;
}
.content .butn button:focus {
  outline: 0;
}
.content .butn button:hover {
  background-color: #b9d015;
}
.content .butn button:active {
  transform: scale(0.95);
}
.content div:first-of-type > p {
  color: #3c7ce8;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 50px;
}
.content .null-name::after {
  content: "请输入用户名";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .null-word::after {
  content: "请输入密码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .nameword-err::after {
  content: "用户名不存在或密码有误";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .d-umail img {
  width: 80px;
  height: 30px;
  border-radius: 5px;
  margin-left: 20px;
}
.content .null-verify::after {
  content: "请输入验证码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .err-verify::after {
  content: "验证码错误";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
</style>