<template>
  <div id="xiugaitouxiang">
    <div class="main-menu">
      <div class="d-img">
        <img
          :src="imgurl"
          onerror="this.src='http://127.0.0.1/Justdoit/userhead/img/default.jpg'"
          alt=""
        />
      </div>
      <div class="d-butn">
        <label>
          <input ref="touxiang" type="file" />
          <span>修改头像</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  computed: {
    imgurl() {
      if (this.$store.state.currentUser) {
        return (
          "http://127.0.0.1/Justdoit/userhead/img/" +
          this.$store.state.currentUser +
          ".jpg?rang=" +
          Math.random()
        );
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.$refs.touxiang.addEventListener("change", () => {
      //发送数据请求

      //数据存储
      let params = new FormData();
      params.append("file", this.$refs.touxiang.files[0]);
      params.append("username", this.$store.state.currentUser);

      instance({
        method: "post",
        url: "/Justdoit/userhead/change_touxiang.php",
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
      }).then((res) => {
        if (res.data == "error") {
          this.$message({
            type: "error",
            message: "图片上传失败，请更换文件或稍后重试",
          });
        } else if (res.data == "max") {
          this.$message({
            type: "error",
            message: "图片大小超过限制，请上传小于10mb的图片",
          });
        } else if (res.data == 1) {
          this.$message({
            type: "success",
            message: "头像修改成功",
          });
          this.$router.go(0);
        }
      });
    });
  },
};
</script>

<style scoped>
#xiugaitouxiang {
  height: 100%;
}
#xiugaitouxiang .main-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px #acacac;
  border-radius: 5px;
  background-color: #ffffff4d;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#xiugaitouxiang .main-menu .d-img {
  margin-top: 30px;
  width: 200px;
  height: 200px;
  box-shadow: 0 0 5px #acacac;
  border-radius: 5px;
  overflow: hidden;
}
#xiugaitouxiang .main-menu .d-img img {
  width: 200px;
  height: 200px;
}
#xiugaitouxiang .main-menu .d-butn {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#xiugaitouxiang .main-menu .d-butn span {
  display: inline-block;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 5px #acacac;
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
  background-color: #b9e71d;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
#xiugaitouxiang .main-menu .d-butn span:active {
  transform: scale(0.95);
}
#xiugaitouxiang .main-menu .d-butn input {
  display: none;
}
</style>