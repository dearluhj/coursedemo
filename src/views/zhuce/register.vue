<template>
  <div id="zhuce-register">
    <div class="zhuce-box">
      <div class="box-left"></div>
      <div class="box-right">
        <div><p>注册</p></div>
        <div ref="duId" class="u-id">
          <input
            ref="username"
            type="text"
            placeholder="请输入用户账号(仅中文字母数字下划线)"
          />
        </div>
        <div ref="duWord" class="u-word">
          <input
            ref="userword"
            type="password"
            placeholder="请输入6-20位密码(仅字母数字下划线)"
          />
        </div>
        <div ref="duWord2" class="u-word2">
          <input ref="userword2" type="password" placeholder="请确认密码" />
        </div>
        <div ref="duPhone" class="u-phone">
          <input ref="email" type="text" placeholder="请输入绑定邮箱" />
        </div>
        <div ref="dmailkey" class="mailyanzheng">
          <input ref="mailkeys" type="text" placeholder="请输入邮箱验证码" />
          <button ref="transmit">发送验证码</button>
        </div>
        <div ref="dyanzheng" class="yanzheng">
          <input ref="yanzhengma" type="text" placeholder="请输入验证码" /><img
            ref="registeryanzheng"
            src=""
            alt=""
          />
        </div>

        <div class="button"><button ref="enrollbtn">注册</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  data() {
    return {
      mailkeys: "",
      codereg: "",
      countdown: "",
      error: 1, //保存错误信息
    };
  },

  mounted() {
    //按钮禁用
    this.button_ban();

    //刷新验证码
    this.$refs.registeryanzheng.addEventListener("click", this.yanzhengma);

    //发送邮箱验证码
    this.$refs.transmit.addEventListener("click", () => {
      //删除错误样式
      this.removeclass();
      //验证输入规范
      this.error = 0; //将错误信息记录清除
      this.judgement();

      //若符合则发送请求
      if (!this.error) {
        instance({
          method: "post",
          url: "/Justdoit/login/mail/mailverify.php",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            email: this.$refs.email.value,
          }),
        }).then((res) => {
          this.mailkeys = res.data;
        });

        //按钮禁用
        this.countdown = 60;
        this.button_ban();
      }
    });

    //注册
    this.$refs.enrollbtn.addEventListener("click", () => {
      this.error = 0; //复位错误信息
      //清除错误信息显示
      this.removeclass();
      this.judgement();

      //判断邮箱验证码是否为空
      if (!this.$refs.mailkeys.value) {
        this.$refs.dmailkey.classList.add("nullmailkeys");
        this.error = 1;
      } else if (this.$refs.mailkeys.value != this.mailkeys) {
        //判断验证码输入是否有误
        this.$refs.dmailkey.classList.add("errmailkeys");
        this.error = 1;
      }

      //判断图形验证码是否为空
      if (!this.$refs.yanzhengma.value) {
        this.$refs.dyanzheng.classList.add("nullyanzhengma");
        this.error = 1;
      } else if (
        this.$refs.yanzhengma.value.toLowerCase() != this.codereg.toLowerCase()
      ) {
        //判断图形验证码输入是否有误
        this.$refs.dyanzheng.classList.add("erryanzhengma");
        this.error = 1;
      }

      //若符合则发送请求
      if (!this.error) {
        //刷新图形验证码
        this.yanzhengma();
        //邮箱验证码失效
        this.mailkeys = "";

        //发送请求
        instance({
          method: "post",
          url: "/Justdoit/login/register.php",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            username: this.$refs.username.value,
            userword: this.$refs.userword.value,
            email: this.$refs.email.value,
          }),
        }).then((res) => {
          if (res.data) {
            if (res.data == "success") {
              this.$message({
                type: "success",
                message: "注册成功，页面将在3s后跳转，请输入账号密码登录",
              });
              setTimeout(() => {
                this.$router.push("/home").catch((err) => {}); //页面跳转
              }, 3000);
            } else {
              this.$message({
                type: "warning",
                message: "系统繁忙，请稍后重试",
              });
            }
          } else {
            this.$refs.duId.classList.add("namerepeat");
            this.$message({
              type: "warning",
              message: "用户名已存在，请更换重试",
            });
          }
        });
      }
    });
  },
  created() {
    //组件加载时自动加载验证码
    this.yanzhengma();
  },
  destroyed() {
    //路由销毁时将新的倒计时时间写入session
    sessionStorage.setItem("countdown", this.countdown);
  },
  methods: {
    button_ban() {
      //按钮禁用
      //判断session里是否有剩余时间数据
      if (sessionStorage.getItem("countdown")) {
        this.countdown = sessionStorage.getItem("countdown");
      }

      if (this.countdown >= 0) {
        this.$refs.transmit.disabled = true;
      }
      let timer = setInterval(() => {
        this.countdown--;
        try {
          this.$refs.transmit.innerHTML = this.countdown + "s";
        } catch {}

        if (this.countdown <= 0) {
          clearInterval(timer);
          //倒计时完成,销毁session
          sessionStorage.removeItem("countdown");
          try {
            this.$refs.transmit.disabled = false;
            this.$refs.transmit.innerHTML = "发送验证码";
          } catch {} //异常捕获

          this.mailkeys = "";
        }
      }, 1000);
    },
    removeclass() {
      this.$refs.duId.classList.remove("nulluserid");
      this.$refs.duId.classList.remove("namerepeat");
      this.$refs.duId.classList.remove("errformat");

      this.$refs.duWord.classList.remove("errformat");
      this.$refs.duWord.classList.remove("nulluserword");

      this.$refs.duWord2.classList.remove("diffword");
      this.$refs.duWord2.classList.remove("nulluserword");

      this.$refs.duPhone.classList.remove("errformat");
      this.$refs.duPhone.classList.remove("nullmail");

      this.$refs.dmailkey.classList.remove("nullmailkeys");
      this.$refs.dmailkey.classList.remove("errmailkeys");

      this.$refs.dyanzheng.classList.remove("erryanzhengma");
      this.$refs.dyanzheng.classList.remove("nullyanzhengma");

      this.error = 0;
    },
    judgement() {
      let reg1 = /^[。\.,，\w\p{sc=Han}]{4,12}$/u; //用户账号正则验证，允许字母汉字下划线数字
      let reg2 = /^[\w]{6,20}$/; //用户密码正则验证
      let reg3 = /^[A-Za-z0-9][\w\-]+@[A-Za-z0-9]+\.[a-zA-Z]{2,4}$/; //用户邮箱正则验证，以数字字母开头>数字字母下划线或-一个或多个>@>数字字母一个或多个>.>字母两个到四个 ，
      //判断用户账号是否为空
      if (!this.$refs.username.value) {
        this.$refs.duId.classList.add("nulluserid");
        this.error = 1;
      } else if (!reg1.test(this.$refs.username.value)) {
        //判断格式是否规范
        this.$refs.duId.classList.add("errformat");
        this.error = 1;
      }

      //判断用户密码是否为空
      if (!this.$refs.userword.value) {
        this.$refs.duWord.classList.add("nulluserword");
        this.error = 1;
      } else if (!reg2.test(this.$refs.userword.value)) {
        //判断密码格式是否规范
        this.$refs.duWord.classList.add("errformat");
        this.error = 1;
      }

      //判断确认密码是否为空
      if (!this.$refs.userword2.value) {
        this.$refs.duWord2.classList.add("nulluserword");
        this.error = 1;
      } else if (this.$refs.userword2.value != this.$refs.userword.value) {
        //判断两次密码是否一致
        this.$refs.duWord2.classList.add("diffword");
        this.error = 1;
      }

      //判断邮箱号是否为空
      if (!this.$refs.email.value) {
        this.$refs.duPhone.classList.add("nullmail");
        this.error = 1;
      } else if (!reg3.test(this.$refs.email.value)) {
        //判断邮箱格式是否规范
        this.$refs.duPhone.classList.add("errformat");
        this.error = 1;
      }
    },
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
            this.codereg = String(res.data);
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
          this.$refs.registeryanzheng.src = res;
        });
    },
  },
};
</script>

<style scoped>
#zhuce-register {
  width: 100%;
  height: 100%;
  background-color: #b4e115;
  position: absolute;
  top: 0;
  z-index: 5;
}
#zhuce-register .zhuce-box {
  width: 800px;
  height: 500px;
  background-color: azure;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50px;
  display: flex;
  overflow: hidden;
}
#zhuce-register .zhuce-box .box-left {
  border-right: 2px solid #919191a2;
  width: 350px;
  background: url("../../assets/img/logo/20210323185257.jpg");
  background-size: 400px 500px;
}
#zhuce-register .zhuce-box .box-right {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#zhuce-register .zhuce-box .box-right div[class] {
  margin: 10px;
  position: relative;
}
#zhuce-register .zhuce-box .box-right div p {
  color: #0080ff;
  font-weight: 600;
  font-size: 30px;
}
#zhuce-register .zhuce-box .box-right div input {
  width: 250px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  padding: 5px;
}
#zhuce-register .zhuce-box .box-right .yanzheng {
  width: 250px;
}
#zhuce-register .zhuce-box .box-right .yanzheng input {
  width: 125px;
}
#zhuce-register .zhuce-box .box-right .mailyanzheng {
  width: 250px;
}
#zhuce-register .zhuce-box .box-right .mailyanzheng input {
  width: 125px;
  margin-right: 20px;
}
#zhuce-register .zhuce-box .box-right .mailyanzheng button {
  border: 0;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 600;
  background-color: #bee929;
}
#zhuce-register .zhuce-box .box-right .mailyanzheng button:focus {
  outline: 0;
}
#zhuce-register .zhuce-box .box-right div input:focus {
  box-shadow: 0 0 5px #d1d1d1;
  outline: 0;
}
#zhuce-register .zhuce-box .box-right div[class="button"] button {
  border: 0;
  width: 250px;
  height: 35px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  background-color: #bee929;
}
#zhuce-register .zhuce-box .box-right div[class="button"] button:focus {
  outline: 0;
}
#zhuce-register .zhuce-box .box-right div[class="button"] button:active {
  transform: scale(0.95);
}
#zhuce-register .zhuce-box .box-right div input::placeholder {
  opacity: 0.5;
}
#zhuce-register .zhuce-box .box-right .yanzheng img {
  width: 80px;
  height: 30px;
  margin-left: 30px;
  border-radius: 5px;
}
#zhuce-register .zhuce-box .box-right .nulluserid::after {
  content: "请输入用户账号";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .nulluserword::after {
  content: "请输入密码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .nullmail::after {
  content: "请输入邮箱号";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .nullmailkeys::after {
  content: "请输入邮箱验证码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .nullyanzhengma::after {
  content: "请输入验证码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .errformat::after {
  content: "非法格式，请重新输入";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .errmailkeys::after {
  content: "邮箱验证码有误，请重新输入";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .erryanzhengma::after {
  content: "验证码有误，请重新输入";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .diffword::after {
  content: "密码不一致，请重新输入";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
#zhuce-register .zhuce-box .box-right .namerepeat::after {
  content: "用户名已存在，请更换";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: -15px;
  left: -3px;
}
</style>