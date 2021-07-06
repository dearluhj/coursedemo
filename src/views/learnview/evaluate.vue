<template>
  <div id="evaluate">
    <div class="editor">
      <div ref="text" class="text" contenteditable="true"></div>
      <div ref="editorbtm" class="editorbottom">
        <button ref="remarkcommit">保存提交</button>
      </div>
    </div>
    <div class="main">
      <div class="comment" v-for="item in leavedata" :key="item.id">
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
        </div>
        <div class="content" v-html="item.content"></div>
        <div class="bottom">
          <div class="time">{{ item.time }}</div>
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
      leavedata: "",
    };
  },
  mounted() {
    //当文本框无内容时保存一个div元素
    function textevent(e) {
      if (e.keyCode == 8 || e.keyCode == 46 || e.button == 0) {
        //回退键与delete键
        if (this.$refs.text.childNodes.length == 0) {
          const div = document.createElement("div");
          div.innerHTML = "<br>";
          this.$refs.text.appendChild(div);
        }
      }
    }
    this.$refs.text.addEventListener("keyup", textevent.bind(this));
    this.$refs.text.addEventListener("mouseup", textevent.bind(this));

    //评论提交
    this.$refs.remarkcommit.addEventListener("click", () => {
      if (
        this.$refs.text.childNodes.length > 10 ||
        this.$refs.text.innerHTML == "" ||
        this.$refs.text.innerHTML == "<div><br></div>"
      ) {
        if (this.$refs.text.childNodes.length > 10) {
          this.$message({
            type: "warning",
            message: "评论字数过长，请适当删减",
          });
        }
        if (
          this.$refs.text.innerHTML == "" ||
          this.$refs.text.innerHTML == "<div><br></div>"
        ) {
          this.$message({
            type: "warning",
            message: "说点什么呗",
          });
        }
      } else {
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
            url: "/Justdoit/video/webapi/addleave.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              userid: this.$store.state.currentUser,
              text: this.$refs.text.innerHTML,
              courseid: this.$route.params.id,
            }),
          }).then((res) => {
            if (res.data == 1) {
              this.$message({
                type: "success",
                message: "发布成功",
              });
              this.$router.go(0);
            } else {
              this.$message({
                type: "error",
                message: "系统繁忙，请稍后再试",
              });
            }
          });
        }
      }
    });
  },
  created() {
    //获取该课程的留言数据
    instance({
      method: "post",
      url: "/Justdoit/video/webapi/selectleave.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        courseid: this.$route.params.id,
      }),
    }).then((res) => {
      this.leavedata = res.data;
    });
  },
};
</script>

<style scoped>
#evaluate {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
}
#evaluate .editor {
  width: 850px;
  height: 240px;
  box-shadow: 0 0 5px #8b8b8b;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
}
#evaluate .editor .text {
  padding: 10px;
  height: 185px;
  overflow: auto;
}
#evaluate .editor .text:focus {
  outline: 0;
}
#evaluate .editor .text::before {
  content: "";
}
#evaluate .editor .editorbottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #b8b8b8;
}
#evaluate .editor .editorbottom button {
  margin: 5px 5px 0 0;
  border: 0;
  background-color: #beeb25;
  font-size: 16px;
  font-weight: 600;
  width: 100px;
  height: 30px;
  color: #ffffff;
  border-radius: 5px;
}

/*定义滚动条样式*/
#evaluate .editor .text::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
#evaluate .editor .text:hover::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*定义滚动条轨道内阴影+圆角*/
#evaluate .editor .text::-webkit-scrollbar-track {
  box-shadow: 0 0 2px #bebebe;
  border-radius: 2px;
}
#evaluate .editor .text:hover:-webkit-scrollbar-track {
  background-color: #e4e4e4b9;
}
/*定义滑块内阴影+圆角*/
#evaluate .editor .text::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: 0 0 5px #bebebe;
  /* background-color: #ffffff00; */
}
#evaluate .editor .text:hover::-webkit-scrollbar-thumb {
  background-color: #006eff57;
}
#evaluate .main {
  width: 850px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#evaluate .main > div {
  width: 80%;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #ffffff4d;
  box-shadow: 0 0 5px #a4a4a4;
  position: relative;
}
#evaluate .main .comment {
  width: 600px;
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f8f8f88a;
  box-shadow: 0 0 5px #b1b1b1;
  position: relative;
}
#evaluate .main .comment:hover {
  box-shadow: 0 0 5px #757575;
}
#evaluate .main .comment .top {
  width: 550px;
  height: 40px;
  border-bottom: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  margin: auto;
}
#evaluate .main .comment .content {
  padding: 10px 15px;
  margin-bottom: 20px;
}
#evaluate .main .comment .top img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
#evaluate .main .comment p {
  margin: 0;
  margin-left: 10px;
  font-size: 17px;
}
#evaluate .main .comment .bottom {
  width: 100%;
  opacity: 0.5;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  display: flex;
}
#evaluate .main .comment .bottom .time {
  margin-left: 10px;
}
</style>