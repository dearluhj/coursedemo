<template>
  <div id="personmessage">
    <div class="main-menu">
      <div>
        <span>用户账号:</span><span>{{ u_id }}</span>
      </div>
      <div>
        <span>用户昵称:</span><span>{{ u_name }}</span>
      </div>
      <div>
        <span>真实姓名:</span><span>{{ realname }}</span>
      </div>
      <div>
        <span>性别:</span><span>{{ sex }}</span>
      </div>
      <div>
        <span>生日:</span><span>{{ birthday }}</span>
      </div>
      <div>
        <span>电话:</span><span>{{ phone }}</span>
      </div>
      <div>
        <span>电子邮箱:</span><span>{{ email }}</span>
      </div>
      <div>
        <span>地址:</span><span>{{ site }}</span>
      </div>
      <div>
        <span>注册时间:</span><span>{{ time }}</span>
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
      u_id: "",
      u_name: "",
      realname: "",
      sex: "",
      birthday: "",
      phone: "",
      email: "",
      site: "",
      time: "",
    };
  },
  created() {
    //获取数据
    instance({
      method: "post",
      url: "/Justdoit/user/permessage.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
      }),
    }).then((res) => {
      if (res.data) {
        this.u_id = res.data[0]["u_id"] ? res.data[0]["u_id"] : "未设置";
        this.u_name = res.data[0]["u_name"] ? res.data[0]["u_name"] : "未设置";
        this.realname = res.data[0]["realname"]
          ? res.data[0]["realname"]
          : "未设置";
        if (res.data[0]["sex"] == "male") {
          this.sex = "男孩子";
        } else if (res.data[0]["sex"] == "female") {
          this.sex = "女孩子";
        } else {
          this.sex = "未设置";
        }
        this.birthday = res.data[0]["birthday"]
          ? res.data[0]["birthday"]
          : "未设置";
        this.phone = res.data[0]["u_phone"] ? res.data[0]["u_phone"] : "未设置";
        this.email = res.data[0]["u_mail"] ? res.data[0]["u_mail"] : "未设置";
        this.site = res.data[0]["site"] ? res.data[0]["site"] : "未设置";
        this.time = res.data[0]["time"] ? res.data[0]["time"] : "未设置";
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
#personmessage {
  height: 100%;
}
#personmessage .main-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px #acacac;
  border-radius: 5px;
  background-color: #ffffff4d;
}
#personmessage .main-menu div {
  margin:0 10px 10px 10px;
  padding: 20px;
}
#personmessage .main-menu div span {
  display: inline-block;
  width: 88px;
  color: #65a3007a;
  font-size: 16px;
  font-weight: 600;
}
#personmessage .main-menu div span:last-child {
  font-size: 18px;
  width: 500px;
  color: #00000083;
}
</style>