<template>
  <div id="comment">
    <div class="commenttop">
      <p>在这里留下你想说的话吧~</p>
    </div>
    <div class="search">
      <div>
        <input
          ref="searchtextvalue"
          type="text"
          placeholder="根据评论内容搜索"
        />
        <i ref="searchbutn" class="glyphicon glyphicon-search"></i>
      </div>
      <div>
        <button ref="selectbutn">查看用户动态</button>
        <button ref="replyselectbutn">查看用户回复的内容</button>
      </div>
    </div>
    <div class="commentmenu">
      <div class="comment" v-for="item in remarkdata" :key="item.id">
        <div class="top">
          <img
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.u_id +
              '.jpg?rang=' +
              Math.random()
            "
            onerror="this.src='http://127.0.0.1/Justdoit/userhead/img/default.jpg'"
            alt=""
          />
          <p>{{ item.u_id }}</p>
          <p
            v-if="currentshow == 2"
            class="glyphicon glyphicon-arrow-right"
          ></p>
          <img
            v-if="currentshow == 2"
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.bu_id +
              '.jpg?rang=' +
              Math.random()
            "
            onerror="this.src='http://127.0.0.1/Justdoit/userhead/img/default.jpg'"
            alt=""
          />
          <p>{{ item.bu_id }}</p>
        </div>
        <div class="text" v-html="item.content"></div>
        <div class="bottom">
          <div class="time">{{ item.time }}</div>
          <div @click="huifu(item.u_id)" class="butn" v-if="currentshow != 2">
            回复
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <i class="glyphicon glyphicon-chevron-left" ref="prev"></i>
      <div>
        <button ref="first">首页</button>
        <p>{{ count }}</p>
        <button ref="last">末页</button>
      </div>
      <i class="glyphicon glyphicon-chevron-right" ref="next"></i>
    </div>
    <div ref="editorial" class="editorial">
      <editor></editor>
    </div>
  </div>
</template>

<script>
import editor from "./editor.vue";
import instance from "network/request.js";
import qs from "qs";

export default {
  components: {
    editor,
  },
  data() {
    return {
      remarkdata: "", //评论表数据
      index: 0, //索引
      totalpage: "", //数据表总页数
      num: 6, //单页显示行数
      count: 1, //页面下标
      currentshow: 1, //当前显示的数据板块,默认显示页面一
      searchvalue: "", //搜索栏关键字
    };
  },
  mounted() {
    //下一页
    this.$refs.next.addEventListener("click", () => {
      if (this.count >= this.totalpage) {
        this.$message({
          type: "warning",
          message: "已经是最后一页了",
        });
      } else {
        this.count++;
        this.index += this.num;
        this.show();
      }
    });
    //上一页
    this.$refs.prev.addEventListener("click", () => {
      if (this.count <= 1) {
        this.$message({
          type: "warning",
          message: "已经是第一页了",
        });
      } else {
        this.count--;
        this.index -= this.num;
        this.show();
      }
    });
    //首页
    this.$refs.first.addEventListener("click", () => {
      if (this.count <= 1) {
        this.$message({
          type: "warning",
          message: "已经是第一页了",
        });
      } else {
        this.count = 1;
        this.index = 0;
        this.show();
      }
    });
    //末页
    this.$refs.last.addEventListener("click", () => {
      if (this.count >= this.totalpage) {
        this.$message({
          type: "warning",
          message: "已经是最后一页了",
        });
      } else {
        this.count = this.totalpage;
        this.index = (this.totalpage - 1) * this.num;
        this.show();
      }
    });
    //查询用户动态内容
    this.$refs.selectbutn.addEventListener("click", () => {
      this.currentshow = 1; //页面一
      this.count = 1;
      this.index = 0;
      this.show();
    });
    //查询用户回复内容
    this.$refs.replyselectbutn.addEventListener("click", () => {
      this.currentshow = 2; //页面二
      this.count = 1;
      this.index = 0;
      this.show();
    });
    //搜索栏功能
    this.$refs.searchbutn.addEventListener("click", () => {
      this.searchvalue = this.$refs.searchtextvalue.value;
      this.count = 1;
      this.index = 0;
      this.show();
    });
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      //查询数据表总行数
      instance({
        method: "post",
        url:
          "/Justdoit/comment/" +
          (this.currentshow == 1 ? "totalpage" : "replytotalpage") +
          ".php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          focus: this.searchvalue,
        }),
      }).then((res) => {
        this.totalpage = Math.ceil(res.data.total / this.num);
      });
      //获取数据
      instance({
        method: "post",
        url:
          "/Justdoit/comment/" +
          (this.currentshow == 1 ? "remarkselect" : "replyselect") +
          ".php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          index: this.index,
          num: this.num,
          focus: this.searchvalue,
        }),
      }).then((res) => {
        this.remarkdata = res.data;
      });
    },
    huifu(id) {
      if (
        this.$store.state.currentUser == "" ||
        this.$store.state.currentUser == null
      ) {
        this.$message({
          type: "warning",
          message: "您还未登录，请先登录",
        });
      } else {
        this.$msgbox
          .prompt(null, "请输入回复内容", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          })
          .then(({ value }) => {
            if (value == null) {
              this.$message({
                type: "warning",
                message: "您未作出任何回复",
              });
            } else {
              instance({
                method: "post",
                url: "/Justdoit/comment/addreplyremark.php",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: qs.stringify({
                  value: value,
                  userid: this.$store.state.currentUser,
                  b_userid: id,
                }),
              }).then((res) => {
                if (res.data == 1) {
                  this.$message({
                    type: "success",
                    message: "回复成功",
                  });
                }
              });
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
#comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#comment .commenttop {
  width: 1100px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
#comment .commenttop > p {
  background-color: #aedd15ce;
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
  border-radius: 5px;
  width: 800px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#comment .commentmenu {
  width: 1100px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#comment .commentmenu .comment {
  width: 600px;
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f8f8f88a;
  box-shadow: 0 0 5px #b1b1b1;
  position: relative;
}
#comment .commentmenu .comment:hover {
  box-shadow: 0 0 5px #757575;
}
#comment .commentmenu .comment .top {
  width: 550px;
  height: 40px;
  border-bottom: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  margin: auto;
}
#comment .commentmenu .comment .text {
  padding: 0 15px;
  margin-bottom: 20px;
}
#comment .commentmenu .comment .top img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
#comment .commentmenu .comment p {
  margin: 0;
  margin-left: 10px;
  font-size: 17px;
}
#comment .commentmenu .comment .bottom {
  width: 100%;
  opacity: 0.5;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  display: flex;
}
#comment .commentmenu .comment .bottom .time {
  margin-left: 10px;
}
#comment .commentmenu .comment .bottom .butn {
  margin-left: auto;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}
#comment .search {
  width: 600px;
  height: 40px;
  box-shadow: 0 0 5px #979797;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
#comment .search div:first-child {
  flex-grow: 1;
  position: relative;
}
#comment .search div:first-child input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 0;
  font-size: 18px;
  padding: 5px 40px 5px 10px;
}
#comment .search div:last-child {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
#comment .search div:last-child button {
  width: 160px;
  height: 30px;
  margin-left: 5px;
  font-size: 16px;
  background-color: #aedd15ce;
  border: 0;
  border-radius: 5px;
  color: #ffffff;
}
#comment .search input::placeholder {
  opacity: 0.5;
}
#comment .search input:focus {
  outline: 0;
  box-shadow: 0 0 5px #838383;
}
#comment .search div:first-child i {
  position: absolute;
  right: 0;
  top: 5px;
  margin-right: 5px;
  color: #77777765;
  font-size: 30px;
  cursor: pointer;
}
#comment .search div:first-child i:hover {
  color: #777777;
}
#comment .order {
  width: 600px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0 0 5px #a3a3a3;
  position: relative;
}
#comment .order div {
  margin: auto;
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#comment .order div button {
  border: 0;
  background-color: #b3ff00a1;
  width: 40px;
  height: 25px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 600;
}
#comment .order div p {
  color: #757575;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
#comment .order i {
  font-size: 20px;
  width: 30px;
  text-align: center;
  color: #777777;
  position: absolute;
  cursor: pointer;
}
#comment .order i:first-child {
  left: 10px;
  top: 10px;
}
#comment .order i:last-child {
  right: 10px;
  top: 10px;
}
#comment .editorial {
  width: 800px;
  height: 300px;
  box-shadow: 0 0 5px #a0a0a0;
  border-radius: 5px;
  margin-top: 20px;
}
</style>