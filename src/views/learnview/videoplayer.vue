<template>
  <div id="videoplayer" ref="videoplayer"></div>
</template>

<script>
import Player from "xgplayer";

export default {
  data() {
    return {
      videourl: "",
      courseid: "",
      coursesection: "",
      playurl: "",
    };
  },
  props: {
    link: String,
    id: String,
    name: String,
  },
  created() {
    let timer1 = setInterval(() => {
      if (this.link) {
        //数据地址
        this.videourl = this.link;
        //课程id
        this.courseid = this.id;
        //集数名称
        this.coursesection = this.name;
        clearInterval(timer1);
      }
    }, 500);
  },
  mounted() {
    let timer2 = setInterval(() => {
      if (this.videourl) {
        this.loading();
        clearInterval(timer2);
      }
    }, 500);
  },
  methods: {
    loading() {
      let player = new Player({
        el: this.$refs.videoplayer,
        url: this.videourl + "/" + this.courseid + "/" + this.coursesection,
        volume: 0.6,
        autoplay: true,
        playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
        width: 850,
        height: 500,
        danmu: {
          comments: [
            //弹幕数组
            {
              duration: 5000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
              id: "1", //弹幕id，需唯一
              start: 3000, //弹幕出现时间，毫秒
              prior: true, //该条弹幕优先显示，默认false
              color: true, //该条弹幕为彩色弹幕，默认false
              txt: "视频内容很精彩", //弹幕文字内容
              style: {
                //弹幕自定义样式
                color: "#ff9500",
                fontSize: "35px",
                borderRadius: "50px",
                padding: "5px 11px",
                // backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              mode: "scroll", //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
              // el: DOM //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
              // eventListeners: [{ //支持自定义DOM设置DOM监听事件
              //   event: 'click',
              //   listener: function (e) {
              //     console.log('click')
              //   },
              //   useCapture: false,
              // }]
            },
          ],
          area: {
            //弹幕显示区域
            start: 0, //区域顶部到播放器顶部所占播放器高度的比例
            end: 1, //区域底部到播放器顶部所占播放器高度的比例
          },
          closeDefaultBtn: true, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
          // defaultOff: true, //开启此项后弹幕不会初始化，默认初始化弹幕
        },
      });
      this.$refs.videoplayer.addEventListener("click", () => {
        if (player.paused) {
          player.play();
        } else {
          player.pause();
        }
      });
    },
  },
};
</script>

<style>
#videoplayer {
  background-color: #ffffff00;
}
.xgplayer-skin-default .xgplayer-controls {
  opacity: 0.8;
  border-radius: 0 0 5px 5px;
}
.xgplayer-skin-default .xgplayer-playbackrate ul {
  border-radius: 10px;
  font-weight: 600;
}
.xgplayer-skin-default .xgplayer-playbackrate p {
  cursor: pointer;
  font-weight: 600;
}
.xgplayer-skin-default .xgplayer-drag {
  background-color: #bae22b;
}
.xgplayer-skin-default .xgplayer-progress-played {
  background-image: linear-gradient(-90deg, #adfa1f, #bbff00);
}
.xgplayer-skin-default .xgplayer-danmu,
.xgplayer-skin-default .xgplayer-replay {
  z-index: 0;
}
</style>