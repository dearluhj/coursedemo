<template>
  <div id="gerenjianjie">
    <div class="menu-right">
      <div class="right-div1">
        <div class="gerenjianjie">
          <span>个人简介</span
          ><i ref="okbtn" class="glyphicon glyphicon-pencil"></i>
        </div>
        <div class="content" ref="personresume">{{ perresume }}</div>
        <textarea ref="textbox" name="" id=""></textarea>
      </div>
      <div class="right-div2">
        <transition :name="transitionname">
          <router-view></router-view>
        </transition>
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
      transitionname: "slide-child",
      perresume: "介绍一下自己呗~",
    };
  },
  mounted() {
    //控制文本编辑框的显示与隐藏
    let onoff = false,
      defaultperresume = this.perresume;
    this.$refs.okbtn.addEventListener("click", () => {
      onoff = !onoff;

      //文本框信息同步
      this.$refs.textbox.value = onoff
        ? this.perresume
        : this.$refs.textbox.value;

      //判断文本框字符是否过长
      if (this.$refs.textbox.value.length >= 50) {
        this.$message({
          type: "warning",
          message: "请不要超过50个字符",
        });
      } else {
        this.perresume = onoff ? this.perresume : this.$refs.textbox.value;
        //关闭文本框后发送数据请求
        if (!onoff) {
          instance({
            method: "post",
            url: "/Justdoit/user/change_gerenjianjie.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              userid: this.$store.state.currentUser,
              introduction: this.perresume,
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
                message: "Servers error!",
              });
            }
          });
        }
      }
      //显示/隐藏文本框
      this.$refs.textbox.style.display = onoff ? "block" : "none";
      this.$refs.personresume.style.display = onoff ? "none" : "block";
      this.$refs.okbtn.className = onoff
        ? "glyphicon glyphicon-ok"
        : "glyphicon glyphicon-pencil";

      //若文本框为空则恢复默认值
      if (!this.$refs.textbox.value) {
        this.perresume = defaultperresume;
      }
    });
  },
  created() {
    instance({
      method: "post",
      url: "/Justdoit/user/permessage.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
      }),
    }).then((res) => {
      if (res.data) {
        this.perresume = res.data[0]["introduction"]
          ? res.data[0]["introduction"]
          : this.perresume;
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
#gerenjianjie .menu-right {
  min-height: 600px;
  display: flex;
  flex-direction: column;
}
#gerenjianjie .menu-right > div {
  box-shadow: 0 0 5px #acacac;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #ffffff54;
}
#gerenjianjie .menu-right > .right-div1 {
  min-height: 200px;
  max-height: 300px;
  padding: 0 10px;
}
#gerenjianjie .menu-right > .right-div2 {
  min-height: 100px;
}
#gerenjianjie .menu-right > .right-div3 {
  height: auto;
  box-shadow: 0 0 0;
  display: flex;
  flex-direction: column;
}
#gerenjianjie .menu-right > .right-div3 > .data {
  box-shadow: 0 0 5px #acacac;
  min-height: 200px;
  margin-bottom: 20px;
  border-radius: 5px;
}
#gerenjianjie .menu-right > .right-div1 .gerenjianjie {
  padding: 10px;
  border-bottom: 1px solid #c0c0c0;
}
#gerenjianjie .menu-right > .right-div1 span {
  font-size: 20px;
  color: #7a7a7aaf;
  font-weight: 600;
}
#gerenjianjie .menu-right > .right-div1 i {
  margin-left: 10px;
  font-size: 20px;
  color: #dda900;
  cursor: pointer;
}
#gerenjianjie .menu-right > .right-div1 textarea {
  resize: none;
  margin-top: 10px;
  border-radius: 5px;
  border: 0;
  background-color: #ffffffb9;
  box-shadow: 0 0 2px #565656;
  width: 100%;
  height: 130px;
  padding: 10px;
  color: #7a7a7a;
  font-size: 15px;
  display: none;
}
#gerenjianjie .menu-right > .right-div1 textarea:focus {
  outline: 0;
  box-shadow: 0 0 5px #565656;
}
#gerenjianjie .menu-right > .right-div1 .content {
  margin-top: 10px;
  padding: 10px;
  color: #000000a4;
  font-size: 15px;
  font-weight: 600;
}
</style>