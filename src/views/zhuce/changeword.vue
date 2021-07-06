<template>
  <div id="change" ref="changeword">
    <div class="content">
      <div class="title">
        <p>密码修改</p>
      </div>
      <div class="order">
        <p ref="box1">1</p>
        <p ref="box2">2</p>
        <p ref="box3">3</p>
      </div>

      <div class="box-one" ref="boxOne">
        <div ref="duname" class="d-uname">
          <input
            ref="uname"
            value=""
            class="uname"
            type="text"
            placeholder="请输入用户账号"
          />
        </div>
        <div ref="dumail" class="d-umail">
          <input
            ref="umail"
            value=""
            class="umail"
            type="text"
            placeholder="请输入绑定邮箱"
          />
        </div>
        <div class="d-butn">
          <button ref="confirm">确认信息</button>
        </div>
      </div>

      <div class="box-two" ref="boxTwo">
        <div ref="dumailkey" class="d-umailkey">
          <input
            ref="umailkey"
            class="umailkey"
            type="text"
            placeholder="请输入验证码"
          />
        </div>
        <div class="d-butn">
          <button ref="verify">验证</button>
        </div>
      </div>

      <div class="box-three" ref="boxThree">
        <div ref="dword" class="d-uword">
          <input
            ref="uword"
            value=""
            class="uword"
            type="password"
            placeholder="请输入修改后的密码"
          />
        </div>
        <div ref="duword2" class="d-uword2">
          <input
            ref="uword2"
            value=""
            class="uword2"
            type="password"
            placeholder="请确认密码"
          />
        </div>
        <div class="d-butn">
          <button ref="commit">提交修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  mounted() {
    // 发送数据验证邮箱与用户名
    this.$refs.confirm.addEventListener("click", () => {
      this.$refs.duname.classList.remove("null-name");
      this.$refs.dumail.classList.remove("null-mail");

      //若为空则输出错误信息
      if (!this.$refs.uname.value) {
        this.$refs.duname.classList.add("null-name");
      }
      if (!this.$refs.umail.value) {
        this.$refs.dumail.classList.add("null-mail");
      }

      //当用户名和邮箱都不为空时执行以下
      if (this.$refs.uname.value && this.$refs.umail.value) {
        //判断邮箱和用户账号格式
        let reg1 = /^[。\.,，\w\p{sc=Han}]{4,12}$/u;
        let reg2 = /^[A-Za-z0-9][\w\-]+@[A-Za-z0-9]+\.[a-zA-Z]{2,4}$/;

        if (!reg1.test(this.$refs.uname.value)) {
          this.$message({
            type: "error",
            message: "用户名格式有误，请重新输入",
          });
        } else if (!reg2.test(this.$refs.umail.value)) {
          this.$message({
            type: "error",
            message: "邮箱格式有误，请重新输入",
          });
        } else {
          //验证用户名是否存在
          instance({
            method: "post",
            url: "/Justdoit/login/changeword/change.php",
            // url:'/vacationsys_/container/php/stafftable.php',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              username: this.$refs.uname.value,
              usermail: this.$refs.umail.value,
            }),
          }).then((res) => {
            if (res.data == "usernull") {
              this.$message({
                type: "error",
                message: "账号不存在。请核对后重试",
              });
            } else if (res.data == "errormail") {
              this.$message({
                type: "error",
                message: "非绑定邮箱，请输入账号绑定的邮箱",
              });
            } else {
              this.username1 = this.$refs.uname.value;
              //发送验证码
              this.emitmailkey();
            }
          });
        }
      }
    });

    //判断邮箱验证码是否正确
    this.$refs.verify.addEventListener("click", () => {
      //判断验证码输入框是否为空
      if (this.$refs.umailkey.value) {
        //判断验证码是否正确
        if (this.$refs.umailkey.value == this.mailkeys) {
          this.$message({
            type: "success",
            message: "验证成功",
          });
          //保存用户名
          //防止用户通过浏览器操作提前进入到密码修改页面
          this.username2 = this.username1;
          //切换盒子
          this.show(2);
        } else {
          this.$message({
            type: "error",
            message: "验证码有误，请重新输入",
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请输入验证码",
        });
      }
    });

    //修改密码
    this.$refs.commit.addEventListener("click", () => {
      //判断文本框是否为空
      if (this.$refs.uword.value) {
        //判断密码格式是否规范
        let reg3 = /^[\w]{6,20}$/;
        if (reg3.test(this.$refs.uword.value)) {
          //判断两次密码输入是否一致
          if (this.$refs.uword.value == this.$refs.uword2.value) {
            //发送请求
            this.change(this.$refs.uword.value);
          } else {
            this.$message({
              type: "error",
              message: "密码不一致，请重新输入",
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "密码格式有误，请重新输入",
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请输入密码",
        });
      }
    });
  },
  data() {
    return {
      //保存验证码
      mailkeys: "",
      //保存用户名
      username1: "",
      username2: "",
    };
  },
  methods: {
    emitmailkey() {
      instance({
        method: "post",
        url: "/Justdoit/login/mail/mailverify.php",
        // url:'/vacationsys_/container/php/stafftable.php',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          email: this.$refs.umail.value,
        }),
      }).then((res) => {
        this.$message({
          type: "success",
          message: "验证码已发送，请注意查收",
        });
        this.mailkeys = res.data;
        //切换盒子
        this.show(1);
      });
    },
    show(key) {
      document
        .querySelectorAll("#change>.content>div:nth-of-type(n+3)")
        .forEach((e, index) => {
          if (index == key) {
            e.style.display = "block";
          } else {
            e.style.display = "none";
          }
        });
      document
        .querySelectorAll("#change>.content>.order>p")
        .forEach((e, index) => {
          if (index == key) {
            e.style.color = "#aade21";
          } else {
            e.style.color = "blue";
          }
        });
    },
    change(password) {
      if (this.username2 == "") {
        //防止用户通过浏览器操作提前进入到此页面
        this.$message({
          type: "error",
          message: "非法操作！",
        });
      } else {
        instance({
          method: "post",
          url: "/Justdoit/login/changeword/change2.php",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            username: this.username2,
            userword: password,
          }),
        }).then((res) => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "修改成功，页面将在2s后跳转",
            });
            //跳转至主页
            setTimeout(() => {
              this.$router.push("/home").catch((err) => {});
            }, 2000);
          } else {
            this.$message({
              type: "error",
              message: "修改失败，请稍后重试",
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#change {
  width: 100%;
  height: 100%;
  background-color: #b4e115;
  position: absolute;
  top: 0;
  z-index: 5;
}
#change > .content {
  width: 600px;
  height: 450px;
  background-color: #f9f9f9;
  border-radius: 50px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content .title p {
  color: #3c7ce8;
  font-weight: 600;
  font-size: 20px;
}
.content .order {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.content .order p {
  font-size: 20px;
  font-weight: 600;
  color: blue;
}
.content .order p:first-of-type {
  color: #aade21;
}
.content .box-two,
.content .box-three {
  display: none;
}
.content .box-one,
.content .box-two,
.content .box-three {
  padding-top: 50px;
  height: 300px;
}
.content .box-one .d-uname,
.content .box-one .d-umail,
.content .box-two .d-umailkey,
.content .box-three .d-uword,
.content .box-three .d-uword2 {
  position: relative;
  overflow: hidden;
}
.content .box-one .uname,
.content .box-one .umail,
.content .box-two .umailkey,
.content .box-three .uword,
.content .box-three .uword2 {
  margin: 15px 0;
  border-radius: 5px;
  width: 220px;
  height: 35px;
  border: 1px solid #bfbfbf;
  padding: 0 5px;
}
.content .box-one .d-umail::before,
.content .box-one .d-uname::before,
.content .box-two .d-umailkey::before,
.content .box-three .d-uword::before,
.content .box-three .d-uword2::before {
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
.content .box-one .d-uname:hover::before,
.content .box-one .d-umail:hover::before,
.content .box-two .d-umailkey:hover::before,
.content .box-three .d-uword:hover::before,
.content .box-three .d-uword2:hover::before {
  transform: translateX(100%);
}

.content .box-one .uname::-webkit-input-placeholder,
.content .box-one .umail::-webkit-input-placeholder,
.content .box-two .umailkey::-webkit-input-placeholder,
.content .box-three .uword::-webkit-input-placeholder,
.content .box-three .uword2::-webkit-input-placeholder {
  opacity: 0.5;
}
.content .box-one .uname::-moz-placeholder,
.content .box-one .umail::-moz-placeholder,
.content .box-two .umailkey::-moz-placeholder,
.content .box-three .uword::-moz-placeholder,
.content .box-three .uword2::-moz-placeholder {
  opacity: 0.5;
}
.content .box-one .uname:focus,
.content .box-one .umail:focus,
.content .box-two .umailkey:focus,
.content .box-three .uword:focus,
.content .box-three .uword2:focus {
  outline: 0;
}
.content .box-one .d-butn,
.content .box-two .d-butn,
.content .box-three .d-butn {
  display: flex;
  justify-content: center;
}
.content .box-one .d-butn button,
.content .box-two .d-butn button,
.content .box-three .d-butn button {
  margin: 10px 5px;
  border-radius: 5px;
  background-color: #d0e927;
  border: 0;
  color: white;
  font-weight: 600;
  width: 80px;
  height: 35px;
}
.content .box-one .d-butn button:focus,
.content .box-two .d-butn button:focus,
.content .box-three .d-butn button:focus {
  outline: 0;
}
.content .box-one .d-butn button:hover,
.content .box-two .d-butn button:hover,
.content .box-three .d-butn button:hover {
  background-color: #b9d015;
}
.content .box-one .d-butn button:active,
.content .box-two .d-butn button:active,
.content .box-three .d-butn button:active {
  transform: scale(0.95);
}

.content .null-name::after {
  content: "请输入用户账号";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .null-mail::after {
  content: "请输入邮箱";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
.content .null-mailkey::after {
  content: "请输入验证码";
  color: red;
  font-size: 12px;
  transform: scale(0.9);
  position: absolute;
  bottom: 0px;
  left: 0;
}
</style>