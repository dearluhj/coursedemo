<template>
  <div id="xinxiwanshan">
    <div class="nicheng">
      <span>昵称：</span
      ><input
        type="text"
        ref="nicheng"
        placeholder="请输入昵称"
        maxlength="20"
      />
    </div>
    <div class="realname">
      <span>真实姓名：</span>
      <input
        type="text"
        ref="realname"
        placeholder="请输入姓名"
        maxlength="10"
      />
    </div>
    <div class="xingbie">
      <span>性别：</span>
      <label><input type="radio" name="sex" ref="sexm" />男</label>
      <label><input type="radio" name="sex" ref="sexf" />女</label>
    </div>
    <div class="birthday">
      <span>生日：</span
      ><input type="date" ref="birth" placeholder="请输入生日" />
    </div>
    <div class="phone">
      <span>电话：</span
      ><input
        type="text"
        name=""
        ref="phone"
        placeholder="请输入电话"
        maxlength="25"
      />
    </div>
    <div class="site">
      <span>地址：</span
      ><input
        type="text"
        name=""
        ref="site"
        placeholder="请输入地址"
        maxlength="50"
      />
    </div>
    <div class="reserve">
      <button ref="reserve">保存</button>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  data() {
    return {};
  },
  mounted() {
    //发送数据请求

    this.$refs.reserve.addEventListener("click", () => {
      //获取性别
      let sex = "";
      if (this.$refs.sexm.checked) {
        sex = "male";
      } else if (this.$refs.sexf.checked) {
        sex = "female";
      } else {
        sex = "";
      }

      instance({
        method: "post",
        url: "/Justdoit/user/messagewrite.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          userid: this.$store.state.currentUser,
          nicheng: this.$refs.nicheng.value,
          realname: this.$refs.realname.value,
          birthday: this.$refs.birth.value,
          phone: this.$refs.phone.value,
          site: this.$refs.site.value,
          sex: sex,
        }),
      }).then((res) => {
        if (res.data == 1) {
          //修改昵称显示
          this.$store.commit('changeusername',this.$refs.nicheng.value);

          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "修改失败",
          });
        }
      });
    });
  },
  created() {
    //初始化数据
    instance({
      method: "post",
      url: "/Justdoit/user/permessage.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
      }),
    }).then((res) => {
      if (res.data) {
        this.$refs.nicheng.value = res.data[0]["u_name"];
        this.$refs.realname.value = res.data[0]["realname"];
        this.$refs.birth.value = res.data[0]["birthday"];
        this.$refs.phone.value = res.data[0]["u_phone"];
        this.$refs.site.value = res.data[0]["site"];
        if (res.data[0]["sex"]=='male') {
          this.$refs.sexm.checked=true;
        }else if (res.data[0]["sex"]=='female') {
          this.$refs.sexf.checked=true;
        }
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
#xinxiwanshan div {
  margin: 10px;
  padding: 15px;
}
#xinxiwanshan div span {
  display: inline-block;
  color: #0000005e;
  font-size: 16px;
  font-weight: 600;
  width: 88px;
}
#xinxiwanshan .xingbie label {
  color: #0000005e;
}
#xinxiwanshan div input:not([type="radio"]) {
  width: 500px;
  height: 30px;
  border: 0;
  box-shadow: 0 0 5px #979797;
  border-radius: 5px;
}
#xinxiwanshan div input:not([type="radio"])::placeholder {
  opacity: 0.5;
}
#xinxiwanshan div input:not([type="radio"]):focus {
  outline: 0;
  box-shadow: 0 0 5px #383838;
}
#xinxiwanshan div input[type="radio"] {
  width: 50px;
}
#xinxiwanshan .reserve {
  display: flex;
  justify-content: center;
}
#xinxiwanshan .reserve button {
  width: 60px;
  height: 30px;
  background-color: #c4e912;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 600;
  border: 0;
}
#xinxiwanshan .reserve button:focus {
  outline: 0;
}
#xinxiwanshan .reserve button:active {
  transform: scale(0.95);
}
</style>