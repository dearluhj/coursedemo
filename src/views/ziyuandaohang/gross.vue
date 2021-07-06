<template>
  <div id="gross-tabbar">
    <div class="rscategory">
      <button>全部资源</button>
      <button>课程案例</button>
      <button>模板</button>
      <button>学习路径</button>
      <button>web基础</button>
      <button>js框架</button>
      <button>css框架</button>
      <button>取色板</button>
    </div>
    <div class="rsmenu">
      <div @click="topage(item.c_id)" v-for="item in coursedata" :key="item.id">
        <h3>{{ item.c_name }}</h3>
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
      coursedata: "",
    };
  },
  created() {
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/coursedata.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((res) => {
      this.coursedata = res.data;
    });
  },
  methods: {
    topage(id) {
      window.open(
        this.$router.resolve({
          path: "/learning/" + id,
          query: { p: 0 },
        }).href
      );
    },
  },
};
</script>

<style scoped>
#gross-tabbar{
  padding-bottom: 20px;
}
.rscategory {
  width: 1100px;
  height: 80px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.rscategory > button {
  background-color: #f6f6f6;
  border: 0;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0 0 5px #d1d1d1;
  font-weight: 600;
  color: #848484;
}
.rscategory > button:hover {
  background-color: #f0f0f0;
}
.rscategory > button:focus {
  outline: 0;
}
.rscategory > button:nth-of-type(1) {
  background-color: #b9de0c;
  color: #ffffff;
}
.rscategory > button:nth-of-type(1):hover {
  background-color: #b0d30c;
}

.rsmenu {
  width: 1100px;
  height: 1100px;
  margin: auto;
  padding: 0 50px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
}
.rsmenu > div {
  width: 200px;
  height: 100px;
  margin: 40px 24px 0 24px;
  border-radius: 5px;
  box-shadow: 0 0 15px #7c7c7c3b;
  background-color: #f6f6f68a;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.rsmenu > div h3 {
  color: #b9de0c;
  margin: 0;
  text-align: center;
}
.rsmenu > div:hover {
  box-shadow: 0 0 5px #848484;
}
</style>