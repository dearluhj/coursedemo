<template>
  <div id="learn-box">
    <div class="main">
      <div class="main-left">
        <videoplayer
          :link="coursedata.url"
          :id="coursedata.c_id"
          :name="section[currentsection]"
          :key="currentsection"
        ></videoplayer>
      </div>
      <div class="main-right">
        <div class="main-right-top">
          <div class="coursename">
            <h2>{{ coursedata.c_name }}</h2>
          </div>
          <div class="author">
            <p>本课作者：{{ coursedata.author }}</p>
          </div>
        </div>
        <div class="main-right-bottom">
          <p>视频选集</p>
          <div>
            <div
              :class="{ active: isActive(index) }"
              v-for="(item, index) in section"
              :key="index"
              @click="topage(index)"
              :title="item.split('.')[0]"
            >
              <p>P{{ index }}</p>
              <p>{{ item.split(".")[0] }}</p>
              <img
                v-if="isActive(index)"
                src="~videoplaying/playing.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="report">
      <div>
        <div class="coursetitle">
          <h3>{{ coursedata.c_introduce }}</h3>
        </div>
        <div class="operate">
          <i ref="shoucang" class="glyphicon glyphicon-star-empty"></i>
          <i ref="dianzang" class="glyphicon glyphicon-thumbs-up"></i>
          <p>{{ dianzangsum }}</p>
        </div>
      </div>
    </div>

    <evaluate></evaluate>
  </div>
</template>

<script>
import loginVue from "../zhuce/login.vue";
import videoplayer from "./videoplayer.vue";
import instance from "network/request.js";
import qs from "qs";
import evaluate from "./evaluate.vue";

export default {
  data() {
    return {
      coursedata: "",
      dianzangsum: "",
      section: "",
    };
  },
  components: {
    videoplayer,
    evaluate,
  },
  created() {
    //获取课程点赞数
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/dianzangsum.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        courseid: this.currentcourseid,
      }),
    }).then((res) => {
      this.dianzangsum = res.data;
    });
    //获取课程数据
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/currentlearn.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        courseid: this.currentcourseid,
      }),
    }).then((res) => {
      this.coursedata = res.data;
    });
    //获取章节列表
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/readfiles.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        dirname: this.currentcourseid,
      }),
    }).then((res) => {
      this.section = res.data.split("*");
    });
    //查询该课程是否已被当前登录用户点赞过及收藏过
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/shoucangstatus.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
        courseid: this.currentcourseid,
      }),
    }).then((res) => {
      if (res.data == 1) {
        //若已被收藏则添加样式
        this.$refs.shoucang.classList.add("shoucanged");
      }
    });
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/dianzangstatus.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        userid: this.$store.state.currentUser,
        courseid: this.currentcourseid,
      }),
    }).then((res) => {
      if (res.data == 1) {
        //若已被点赞则添加样式
        this.$refs.dianzang.classList.add("dianzanged");
      }
    });
  },
  mounted() {
    //课程收藏
    this.$refs.shoucang.addEventListener("click", () => {
      if (this.$refs.shoucang.className.indexOf("shoucanged") == -1) {
        this.operation("shoucang");
      } else {
        this.operationcancel("shoucang");
      }
    });
    //点赞
    this.$refs.dianzang.addEventListener("click", () => {
      if (this.$refs.dianzang.className.indexOf("dianzanged") == -1) {
        this.operation("dianzang");
      } else {
        this.operationcancel("dianzang");
      }
    });
  },
  computed: {
    currentcourseid() {
      return this.$route.params.id;
    },
    currentsection() {
      return this.$route.query.p;
    },
  },
  methods: {
    isActive(p) {
      return this.$route.query.p == p ? true : false;
    },
    topage(p) {
      this.$router.push({
        query: {
          p,
        },
      });
    },
    operation(op) {
      if (
        this.$store.state.currentUser == null ||
        this.$store.state.currentUser == ""
      ) {
        this.$message({
          type: "warning",
          message: "您还未登录，请先登录",
        });
      } else {
        instance({
          method: "post",
          url:
            "/Justdoit/video/webapi/" +
            (op == "shoucang" ? "shoucang" : "dianzang") +
            ".php",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            userid: this.$store.state.currentUser,
            courseid: this.coursedata.c_id,
          }),
        }).then((res) => {
          if (res.data == 1) {
            this.$message({
              type: "success",
              message: op == "shoucang" ? "收藏成功" : "已点赞",
            });
            if (op == "shoucang") {
              this.$refs.shoucang.classList.add("shoucanged");
            } else {
              this.$refs.dianzang.classList.add("dianzanged");
            }
          } else {
            this.$message({
              type: "error",
              message: "操作失败",
            });
          }
        });
      }
    },
    operationcancel(op) {
      instance({
        method: "post",
        url:
          "/Justdoit/video/webapi/" +
          (op == "shoucang" ? "shoucang" : "dianzang") +
          "cancel.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          userid: this.$store.state.currentUser,
          courseid: this.coursedata.c_id,
        }),
      }).then((res) => {
        if (res.data == 1) {
          this.$message({
            type: "success",
            message: op == "shoucang" ? "已取消收藏" : "已取消点赞",
          });
          if (op == "shoucang") {
            this.$refs.shoucang.classList.remove("shoucanged");
          } else {
            this.$refs.dianzang.classList.remove("dianzanged");
          }
        } else {
          this.$message({
            type: "error",
            message: "操作失败",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#learn-box .main {
  margin: auto;
  margin-top: 30px;
  width: 1200px;
  height: 500px;
  display: flex;
  justify-content: space-between;
}
#learn-box .main .main-left {
  width: 850px;
  background-color: #272727;
  border-radius: 5px;
  box-shadow: 0 0 5px #41414185;
}
#learn-box .main .main-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#learn-box .main .main-right .main-right-top {
  height: 150px;
  background-color: #ffffffad;
  border-radius: 5px;
  box-shadow: 0 0 5px #41414185;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}
#learn-box .main .main-right .main-right-top .coursename {
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
#learn-box .main .main-right .main-right-top .author {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  font-weight: 600;
  color: #00000067;
}
#learn-box .main .main-right .main-right-bottom {
  height: 320px;
  background-color: rgba(238, 238, 238, 0);
  border-radius: 5px;
  box-shadow: 0 0 5px #41414185;
  padding: 10px;
}
#learn-box .main .main-right .main-right-bottom > p {
  margin: 0;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: #4d4d4d;
}
#learn-box .main .main-right .main-right-bottom > div {
  height: 270px;
  overflow: auto;
}
#learn-box .main .main-right .main-right-bottom > div > div {
  width: 270px;
  border-radius: 5px;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  color: #000000;
  font-size: 14px;
  min-height: 30px;
}
#learn-box .main .main-right .main-right-bottom > div > div > p {
  margin: 0;
  height: 20px;
}
#learn-box .main .main-right .main-right-bottom > div > div > img {
  margin-left: auto;
  width: 18px;
}
#learn-box .main .main-right .main-right-bottom > div > div > p:last-of-type {
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#learn-box .main .main-right .main-right-bottom > div > div:hover {
  background-color: #ffffff;
  color: #006eff;
}
#learn-box .main .main-right .main-right-bottom > div .active {
  background-color: #ffffff;
  color: #006eff;
}
/*定义滚动条样式*/
#learn-box .main .main-right .main-right-bottom > div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
#learn-box .main .main-right .main-right-bottom > div:hover::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*定义滚动条轨道内阴影+圆角*/
#learn-box .main .main-right .main-right-bottom > div::-webkit-scrollbar-track {
  box-shadow: 0 0 2px #bebebe;
  border-radius: 2px;
}
#learn-box
  .main
  .main-right
  .main-right-bottom
  > div:hover:-webkit-scrollbar-track {
  background-color: #e4e4e4b9;
}
/*定义滑块内阴影+圆角*/
#learn-box .main .main-right .main-right-bottom > div::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: 0 0 5px #bebebe;
  /* background-color: #ffffff00; */
}
#learn-box
  .main
  .main-right
  .main-right-bottom
  > div:hover::-webkit-scrollbar-thumb {
  background-color: #006eff57;
}

#learn-box .report {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
}
#learn-box .report > div {
  width: 850px;
  height: 80px;
  padding: 0 10px;
  background-color: #ffffffad;
  border-radius: 5px;
  box-shadow: 0 0 5px #41414185;
  display: flex;
  align-items: center;
}
#learn-box .report > div .coursetitle {
  flex-grow: 2;
}
#learn-box .report > div .operate {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
#learn-box .report > div .operate i {
  margin-left: 40px;
  font-size: 35px;
  color: #0000008a;
  cursor: pointer;
}
#learn-box .report > div .operate p {
  color: #00000067;
  font-size: 16px;
  margin-left: 5px;
  font-weight: 600;
}
#learn-box .report > div .operate .shoucanged {
  color: #ffee00;
}
#learn-box .report > div .operate .dianzanged {
  color: #ff0000;
}
</style>