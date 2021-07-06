<template>
  <div id="xiugaimima">
    <div class="main-menu">
      <div class="oldpassword">
        <span>旧密码:</span
        ><input ref="old" type="password" placeholder="请输入原密码" />
      </div>
      <div class="newpassword">
        <span>新密码:</span
        ><input
          ref="new"
          type="password"
          name=""
          placeholder="请输入修改后的密码"
        />
      </div>
      <div class="newpassword2">
        <span>确认新密码:</span
        ><input
          ref="renew"
          type="password"
          name=""
          placeholder="请确认修改后的密码"
        />
      </div>
      <div class="changebutn">
        <button ref="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  mounted() {
    this.$refs.confirm.addEventListener("click", () => {
      if (
        this.$refs.new.value &&
        this.$refs.old.value &&
        this.$refs.renew.value
      ) {
        //判断原密码是否有误
        instance({
          method: "post",
          url: "/Justdoit/user/password/judgement.php",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            userid: this.$store.state.currentUser,
            password: this.$refs.old.value,
          }),
        }).then((res) => {
          if (res.data === "error") {
            this.$message({
              type: "error",
              message: "服务器繁忙，请稍后再试",
            });
          } else if (res.data == 0) {
            this.$message({
              type: "error",
              message: "原密码有误，请重新输入",
            });
          } else {
            //正则验证
            let reg = /^[\w]{6,20}$/;
            if (reg.test(this.$refs.new.value)) {
              //判断两次密码输入是否一致
              if (this.$refs.new.value == this.$refs.renew.value) {
                //发送数据
                instance({
                  method: "post",
                  url: "/Justdoit/user/password/change.php",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: qs.stringify({
                    userid: this.$store.state.currentUser,
                    password: this.$refs.new.value,
                  }),
                }).then((res) => {
                  if (res.data == 1) {
                    this.$message({
                      type: "success",
                      message: "修改成功",
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: "修改失败，请稍后重试",
                    });
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  message: "密码输入不一致，请重新输入",
                });
              }
            } else {
              this.$message({
                type: "error",
                message: "密码格式有误，请重新输入",
              });
            }
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "密码不能为空值",
        });
      }
    });
  },
};
</script>

<style scoped>
#xiugaimima {
  height: 100%;
}
#xiugaimima .main-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px #acacac;
  border-radius: 5px;
  background-color: #ffffff4d;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#xiugaimima .main-menu div {
  margin: 40px 0 0 0;
}
#xiugaimima .main-menu div span {
  display: inline-block;
  width: 120px;
  height: 100%;
  color: #acacac;
  font-size: 20px;
  font-weight: 600;
}
#xiugaimima .main-menu div input {
  width: 500px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px #909090;
  padding: 5px 10px;
  font-size: 16px;
}
#xiugaimima .main-menu div input:focus {
  outline: 0;
}
#xiugaimima .main-menu div input::placeholder {
  opacity: 0.5;
}
#xiugaimima .main-menu .changebutn button {
  width: 100px;
  height: 48px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 5px #b0b0b0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  background-color: #baea15;
}
#xiugaimima .main-menu .changebutn button:focus {
  outline: 0;
}
#xiugaimima .main-menu .changebutn button:active {
  transform: scale(0.95);
}
</style>