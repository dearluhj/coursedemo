<template>
  <div id="editor">
    <div class="editortop">
      <button><b>B</b></button>
      <button><u>U</u></button>
      <button><i>I</i></button>
    </div>
    <div ref="text" class="text" contenteditable="true"></div>
    <div ref="editorbtm" class="editorbottom">
      <button ref="remarkcommit">保存提交</button>
    </div>
  </div>
</template>

<script>
import instance from "network/request.js";
import qs from "qs";

export default {
  name: "UM",
  data() {
    return {
      editor: null,
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
            url: "/Justdoit/comment/addremark.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              userid: this.$store.state.currentUser,
              text: this.$refs.text.innerHTML,
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

    //文本样式更改测试
    // this.$refs.text.addEventListener("mouseup", () => {
    //   let strfocus = document.getSelection().toString(),
    //     str = this.$refs.text.innerHTML;
    //   let i = str.indexOf(strfocus, 0);
    //   let str_=str.split('').splice(i,strfocus.length+i,"<b>",strfocus.split(''),"</b>");
    //   // console.log(str.split(''));
    //   console.log(str_.join(''));
    //   console.log(strfocus);
    // });
  },
  methods: {},
};
</script>

<style scoped>
#editor {
  height: 100%;
  width: 100%;
}
#editor .editortop {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #b8b8b8;
  display: flex;
  align-items: center;
}
#editor .editortop button {
  font-size: 20px;
  border: 0;
  background-color: #94949448;
  border-radius: 5px;
  margin: 0 5px;
  width: 30px;
}
#editor .editortop button:hover {
  background-color: #94949491;
}
#editor .editortop button:focus {
  outline: 0;
}
#editor .text {
  padding: 10px;
  height: 220px;
  overflow: auto;
}
#editor .text:focus {
  outline: 0;
}
#editor .text::before {
  content: "";
}
#editor .editorbottom {
  display: flex;
  border-top: 1px solid #b8b8b8;
}
#editor .editorbottom button {
  margin: 5px 5px 0 auto;
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
#editor .text::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
#editor .text:hover::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*定义滚动条轨道内阴影+圆角*/
#editor .text::-webkit-scrollbar-track {
  box-shadow: 0 0 2px #bebebe;
  border-radius: 2px;
}
#editor .text:hover:-webkit-scrollbar-track {
  background-color: #e4e4e4b9;
}
/*定义滑块内阴影+圆角*/
#editor .text::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: 0 0 5px #bebebe;
  /* background-color: #ffffff00; */
}
#editor .text:hover::-webkit-scrollbar-thumb {
  background-color: #006eff57;
}
</style>