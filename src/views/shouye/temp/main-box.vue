<template>
  <div>
    <main class="main-menu moderate">
      <div v-for="item in coursedata" :key="item.id" @click="topage(item.c_id)">
        <div class="d-img">
          <img :src="'http://127.0.0.1/Justdoit/video/img/'+item.c_id+'.jpg'" alt="">
        </div>
        <div class="d-title">
          <h3>{{item.c_name}}</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  data() {
    return {
      coursedata: "",
    };
  },
  mounted() {},
  created() {
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/coursedata.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((res) => {
      if (res.data == 0) {
        this.$message({
          type: "error",
          message: "Servers error!",
        });
      } else {
        this.coursedata = res.data;
      }
    });
  },
  methods: {
    topage(id) {
      window.open(
        this.$router.resolve({
          path: "/learning/" + id, // 这里写的是要跳转的路由地址
          query: { p: 1 }, // 这里写的是页面参数
        }).href
      );
    },
  },
};
</script>

<style scoped>
.main-menu {
  width: 1200px;
  height: auto;
  padding: 20px;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px 40px;
}
.main-menu > div {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 1px #9f9f9f;
  cursor: pointer;
}
.main-menu > div:hover {
  box-shadow: 0 0 10px #919191;
}
.main-menu .d-img{
  width: 360px;
  height: 220px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.main-menu .d-img img{
  width: inherit;
  height: inherit;
}
.main-menu .d-title{
  width: inherit;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
.main-menu .d-title h3{
  margin: 0;
}
</style>