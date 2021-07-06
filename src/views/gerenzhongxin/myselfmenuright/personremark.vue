<template>
  <div id="personremark">
    <div class="main-menu">
      <div class="comment" v-for="item in remarkdata" :key="item.id">
        <div class="top">
          <img
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.u_id +
              '.jpg?rang=' +
              Math.random()
            "
            alt=""
          />
          <p>{{ item.u_id }}</p>
        </div>
        <div class="text" v-html="item.content"></div>
        <div class="bottom">
          <div class="time">{{ item.time }}</div>
          <div @click="cancel(item.id, 1)" class="butn">删除</div>
        </div>
      </div>
      <!-- 回复评论显示 -->
      <div class="comment" v-for="item in replyremarkdata" :key="item.id">
        <div class="top">
          <img
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.u_id +
              '.jpg?rang=' +
              Math.random()
            "
            alt=""
          />
          <p>{{ item.u_id }}</p>
          <p class="glyphicon glyphicon-arrow-right"></p>
          <img
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.bu_id +
              '.jpg?rang=' +
              Math.random()
            "
            alt=""
          />
          <p>{{ item.bu_id }}</p>
        </div>
        <div class="text" v-html="item.content"></div>
        <div class="bottom">
          <div class="time">{{ item.time }}</div>
          <div @click="cancel(item.id, 2)" class="butn">删除</div>
        </div>
      </div>
      <!-- 课程留言数据展示 -->
      <div class="comment" v-for="item in courseleavedata" :key="item.id">
        <div class="top">
          <img
            :src="
              'http://127.0.0.7/Justdoit/userhead/img/' +
              item.u_id +
              '.jpg?rang=' +
              Math.random()
            "
            alt=""
          />
          <p>{{ item.u_id }}</p>
          <p class="glyphicon glyphicon-arrow-right"></p>
          <p>({{ item.c_name }})</p>
        </div>
        <div class="text" v-html="item.content"></div>
        <div class="bottom">
          <div class="time">{{ item.time }}</div>
          <div @click="cancelcourseleave(item.id)" class="butn">删除</div>
        </div>
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
      remarkdata: "",
      replyremarkdata: "",
      courseleavedata: "",
    };
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      //获取用户留言数据
      instance({
        method: "post",
        url: "/Justdoit/user/remarkselect.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          username: this.$store.state.currentUser,
        }),
      }).then((res) => {
        this.remarkdata = res.data;
      });
      //获取用户回复数据
      instance({
        method: "post",
        url: "/Justdoit/user/replyremarkselect.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          username: this.$store.state.currentUser,
        }),
      }).then((res) => {
        this.replyremarkdata = res.data;
      });
      //获取用户在课程下的留言数据
      instance({
        method: "post",
        url: "/Justdoit/user/courseleaveselect.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          username: this.$store.state.currentUser,
        }),
      }).then((res) => {
        this.courseleavedata = res.data;
      });
    },
    cancel(id, kind) {
      this.$msgbox
        .confirm("此操作将永久删除该评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          instance({
            method: "post",
            url:
              "/Justdoit/user/" +
              (kind == 1 ? "deleteremark" : "deletereplyremark") +
              ".php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              id: id,
            }),
          }).then((res) => {
            if (res.data == 1) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.$router.go(0);
            }
          });
        })
        .catch(() => {});
    },
    cancelcourseleave(id) {
      this.$msgbox
        .confirm("此操作将永久删除该评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          instance({
            method: "post",
            url: "/Justdoit/user/deletecourseleave.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              id,
            }),
          }).then((res) => {
            if (res.data == 1) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.$router.go(0);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
#personremark {
  height: 100%;
}
#personremark .main-menu {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px #acacac;
  border-radius: 5px;
  background-color: #ffffff4d;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#personremark .main-menu .comment {
  width: 600px;
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f8f8f88a;
  box-shadow: 0 0 5px #b1b1b1;
  position: relative;
}
#personremark .main-menu .comment:hover {
  box-shadow: 0 0 5px #757575;
}
#personremark .main-menu .comment .top {
  width: 550px;
  height: 40px;
  border-bottom: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  margin: auto;
}
#personremark .main-menu .comment .text {
  padding: 0 15px;
  margin-bottom: 20px;
}
#personremark .main-menu .comment .top img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
#personremark .main-menu .comment p {
  margin: 0;
  margin-left: 10px;
  font-size: 17px;
}
#personremark .main-menu .comment .bottom {
  width: 100%;
  opacity: 0.5;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  display: flex;
}
#personremark .main-menu .comment .bottom .time {
  margin-left: 10px;
}
#personremark .main-menu .comment .bottom .butn {
  margin-left: auto;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>