<template>
  <div id="categorybox">
    <nav class="nav2-menu moderate">
      <div class="divtop">
        <div>
          <input ref="searchtext" type="text" placeholder="搜索课程" />
          <button
            ref="valueremove"
            class="glyphicon glyphicon-remove-circle btn1"
          ></button>
          <button ref="search" class="glyphicon glyphicon-search btn2"></button>
        </div>
        <button @click="searchcourse('')" class="btn3">显示所有课程</button>
      </div>
      <div class="divbottom">
        <div class="div1">
          <button @click="searchcourse('')">全部课程</button>
        </div>

        <div class="div2">
          <button @click="coursecategory('html')">
            <img src="../../../assets/img/boxbottomcategory/html.jpg" alt="" />
            HTML
          </button>
          <button @click="coursecategory('css')">
            <img src="../../../assets/img/boxbottomcategory/css.jpg" alt="" />
            CSS
          </button>
          <button @click="coursecategory('javascript')">
            <img
              src="../../../assets/img/boxbottomcategory/javascript.jpg"
              alt=""
            />
            JavaScript
          </button>
          <button @click="coursecategory('vue')">
            <img src="../../../assets/img/boxbottomcategory/vue.png" alt="" />
            Vue
          </button>
          <button @click="coursecategory('jquery')">
            <img
              src="../../../assets/img/boxbottomcategory/jquery.jpg"
              alt=""
            />
            Jquery
          </button>
          <button @click="coursecategory('ajax')">
            <img src="../../../assets/img/boxbottomcategory/ajax.jpg" alt="" />
            Ajax
          </button>
          <button @click="coursecategory('node')">
            <img src="../../../assets/img/boxbottomcategory/node.jpg" alt="" />
            Node.Js
          </button>
        </div>
      </div>
    </nav>

    <main class="main-menu moderate">
      <div v-for="item in tempdata" :key="item.id" @click="topage(item.c_id)">
        <div class="d-img">
          <img
            :src="'http://127.0.0.1/Justdoit/video/img/' + item.c_id + '.jpg'"
            alt=""
          />
        </div>
        <div class="d-title">
          <h3>{{ item.c_name }}</h3>
        </div>
      </div>
    </main>
    <div>
      <p ref="loading">
        {{ templeng >= coursedata.length ? "没有更多了" : "点击加载更多" }}
      </p>
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
      tempdata: "",
      num: 9, //单次加载显示课程数
      templeng: 0, //页面当前显示课程数
    };
  },
  mounted() {
    this.$refs.valueremove.addEventListener("click", () => {
      this.$refs.searchtext.value = "";
    });
    this.$refs.search.addEventListener("click", () => {
      this.searchcourse(this.$refs.searchtext.value);
    });
    this.$refs.loading.addEventListener("click", () => {
      if (this.templeng < this.coursedata.length) {
        this.templeng += this.num;
        this.tempdata = this.coursedata.filter((item, index) => {
          return index < this.templeng;
        });
      }
    });
  },
  created() {
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/shouyecoursedata.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((res) => {
      if (res.data == 0) {
        this.$message({
          type: "error",
          message: "Servers error!",
        });
      } else {
        this.coursedata = res.data;
        this.templeng = this.num;
        this.tempdata = this.coursedata.filter((item, index) => {
          return index < this.templeng;
        });
      }
    });
  },
  methods: {
    topage(id) {
      window.open(
        this.$router.resolve({
          path: "/learning/" + id, // 这里写的是要跳转的路由地址
          query: { p: 0 }, // 这里写的是页面参数
        }).href
      );
    },
    searchcourse(name) {
      this.templeng = this.coursedata.length;
      this.tempdata = this.coursedata.filter((item) => {
        return name
          .toLowerCase()
          .split("")
          .every((item2) => {
            return item.c_name.toLowerCase().indexOf(item2) != -1;
          });
      });
    },
    coursecategory(name) {
      this.templeng = this.coursedata.length;
      this.tempdata = this.coursedata.filter((item) => {
        return item.c_name.toLowerCase().indexOf(name) != -1;
      });
    },
  },
};
</script>

<style scoped>
#categorybox .nav2-menu {
  width: 1100px;
  height: 130px;
  background-color: rgba(255, 255, 255, 0.548);
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
  grid-row-gap: 5px;
  box-shadow: 0 0 10px #b0b0b0;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 100%;
}

#categorybox .divtop {
  display: flex;
  justify-content: center;
  align-items: center;
}
#categorybox .divtop > div {
  position: relative;
  display: flex;
}
#categorybox .divtop > div > input {
  width: 400px;
  height: 45px;
  font-size: 16px;
  color: #909090;
  border: 0px;
  box-shadow: 0 0 2px #787878;
  padding: 0 40px 0 15px;
  border-radius: 2px;
  opacity: 0.8;
}
#categorybox .divtop > div > input:focus {
  outline: 0px;
  box-shadow: 0 0 5px #787878;
}
#categorybox .divtop > div > .btn2 {
  width: 50px;
  border-radius: 10px;
  margin-left: 10px;
  font-size: 30px;
  color: #909090;
  opacity: 0.5;
  border: 0px;
  background-color: #ffffff;
}
#categorybox .divtop > div > .btn2:hover {
  opacity: 1;
}
#categorybox .divtop > div > .btn2:focus {
  outline: 0px;
}
#categorybox .divtop > div > .btn2:active {
  background-color: #f9f9f9;
}
#categorybox .divtop > div > .btn1 {
  position: absolute;
  right: 70px;
  top: 50%;
  margin-top: -10px;
  font-size: 20px;
  border: 0;
  background-color: #ffffff;
  color: #9a9a9a;
  opacity: 0.5;
}
#categorybox .divtop > div > .btn1:hover {
  opacity: 1;
}
#categorybox .divtop > div > .btn1:focus {
  outline: 0;
}
#categorybox .divtop > button {
  width: 120px;
  height: 45px;
  font-weight: 600;
  background-color: #93c903;
  color: #ffffff;
  border: 0;
  border-radius: 5px;
  opacity: 0.6;
  margin-left: 80px;
}
#categorybox .divtop > button:hover {
  opacity: 1;
}
#categorybox .divtop > button:focus {
  outline: 0;
}
#categorybox .divtop > button:active {
  transform: scale(0.95);
}

#categorybox .divbottom {
  display: flex;
  align-items: center;
}
#categorybox .divbottom > .div1 {
  width: 200px;
}
#categorybox .divbottom > .div1 > button {
  width: 100px;
  height: 35px;
  margin-left: 50px;
  border-radius: 5px;
  border: 0;
  color: #ffffff;
  font-weight: 600;
  background-color: #93c903;
  opacity: 0.6;
}
#categorybox .divbottom > .div1 > button:focus {
  outline: 0;
}
#categorybox .divbottom > .div1 > button:hover {
  opacity: 1;
}
#categorybox .divbottom > .div1 > button:active {
  transform: scaleX(0.95) scaleY(0.95);
}
#categorybox .divbottom > .div2 {
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
}
#categorybox .divbottom > .div2 > button {
  width: 80px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0 0 3px #c5c5c5;
  border: 0;
  background-color: #f8f8f8;
}
#categorybox .divbottom > .div2 > button:focus {
  outline: 0;
}
#categorybox .divbottom > .div2 > button:hover {
  background-color: #bfec5596;
}
#categorybox .divbottom > .div2 > button:nth-of-type(3) {
  width: 100px;
}
#categorybox .divbottom > .div2 > button > img {
  width: 20px;
}
/* 课程展示区样式开始处 */
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
.main-menu .d-img {
  width: 360px;
  height: 220px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.main-menu .d-img img {
  width: inherit;
  height: inherit;
}
.main-menu .d-title {
  width: inherit;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
.main-menu .d-title h3 {
  margin: 0;
}
#categorybox > div {
  width: 100px;
  margin: auto;
}
#categorybox > div > p {
  text-align: center;
  cursor: pointer;
  color: #a3a3a3;
}
</style>