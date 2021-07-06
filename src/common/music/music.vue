<template>
  <div>
    <div class="onmusic">
      <div>
        <i class="glyphicon glyphicon-step-backward"></i>
        <i class="glyphicon glyphicon-play"></i>
        <!-- <i class="glyphicon glyphicon-pause"></i> -->

        <i class="glyphicon glyphicon-step-forward"></i>
      </div>
      <img class="imgmusic" src="http://127.0.0.1/Justdoit/music/img/chunfengshili.jpg" alt="" />
      <p class="musicname"></p>
    </div>

    <audio class="musicaudio" src="http://127.0.0.1/Justdoit/music/春风十里-鹿先森乐队.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //歌曲目录
      songs: [
        {
          img: "http://127.0.0.1/Justdoit/music/img/chunfengshili.jpg",
          src: "http://127.0.0.1/Justdoit/music/春风十里-鹿先森乐队.mp3",
        },
        {
          img: "http://127.0.0.1/Justdoit/music/img/su.jpg",
          src: "http://127.0.0.1/Justdoit/music/凯瑟喵 - 溯.mp3",
        },
        {
          img: "http://127.0.0.1/Justdoit/music/img/huan.jpg",
          src: "http://127.0.0.1/Justdoit/music/凯瑟喵 - 谎（无念白版）.mp3",
        },
        {
          img: "http://127.0.0.1/Justdoit/music/img/xiyou.jpg",
          src: "http://127.0.0.1/Justdoit/music/李上安,Todd Li - 西柚.mp3",
        },
        {
          img: "http://127.0.0.1/Justdoit/music/img/shuixingji.jpg",
          src: "http://127.0.0.1/Justdoit/music/郭顶-水星记.mp3",
        },
      ],
    };
  },
  mounted() {
    let musicBox = {
      musicDom: null, //播放器对象
      oimg: null, //图片对象
      bTni: null, //播放按钮对象
      pname: null, //曲名对象
      vuedata: this, //vue对象

      n: null, //记录歌单歌曲数量
      num: 0, //记录当前播放歌曲序号

      //初始化音乐盒
      init: function () {
        this.musicDom = document.querySelector(".musicaudio");
        this.bTni = document.querySelector(".onmusic i:nth-of-type(2)");
        this.oimg = document.querySelector(".imgmusic");
        this.pname = document.querySelector(".onmusic>.musicname");
        this.n = this.vuedata.songs.length;
        this.pname.innerHTML = this.vuedata.songs[this.num].src.match(
          /\p{sc=Han}{1}.+?(?=\.)/u
        )[0];
      },

      //播放
      start: function (i) {
        this.musicDom.play();
      },

      //暂停音乐
      stop: function () {
        this.musicDom.pause();
      },

      //下一首
      next: function () {
        this.num = (this.num + 1) % this.n;
        this.action();
        // console.log(music.src);
        this.start();
      },

      //上一首
      prev: function () {
        this.num = (this.num + this.n - 1) % this.n;
        this.action();
        // console.log(music.src);
        this.start();
      },

      //按钮，图片切换及各动效
      action: function () {
        this.musicDom.src = this.vuedata.songs[this.num].src;
        this.oimg.src = this.vuedata.songs[this.num].img;
        this.pname.innerHTML = this.vuedata.songs[this.num].src.match(
          /\p{sc=Han}{1}.+?(?=\.)/u
        )[0];
        this.bTni.className = "glyphicon glyphicon-pause";
        this.oimg.classList.add("imgrotate");
      },

      //播放暂停
      playpause: function () {
        if (this.musicDom.paused) {
          this.start();
          this.bTni.className = "glyphicon glyphicon-pause";
          this.oimg.classList.add("imgrotate");
        } else {
          this.stop();
          this.bTni.className = "glyphicon glyphicon-play";
          this.oimg.classList.remove("imgrotate");
        }
      },
    };

    //初始化
    musicBox.init();
    // setTimeout(() => {
    //   musicBox.playpause();
    // }, 2000);

    //播放暂停
    musicBox.bTni.addEventListener("click", function () {
      musicBox.playpause();
    });

    document
      .querySelector(".onmusic i:nth-of-type(3)")
      .addEventListener("click", function () {
        musicBox.next();
      });

    document
      .querySelector(".onmusic i:nth-of-type(1)")
      .addEventListener("click", function () {
        musicBox.prev();
      });

    musicBox.musicDom.addEventListener("ended", function () {
      musicBox.next();
    });
  },
};
</script>

<style scoped>
.onmusic {
  width: 130px;
  height: 50px;
  border-radius: 50px;
  background-color: #05bf00;
  box-shadow: 0 0 5px #808080;
  position: fixed;
  z-index: 2;
  bottom: 20%;
  display: flex;
  transform: translateX(-80px);
  transition: 1s;
}
.onmusic:hover {
  transform: translateX(0px);
}
.onmusic > .musicname {
  position: absolute;
  top: 100%;
  left: 10%;
  width: 100px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #808080;
  opacity: 0;
  transition: 2s;
}
.onmusic:hover > .musicname {
  opacity: 1;
}
.onmusic > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px;
}
.onmusic > .imgrotate {
  animation-name: rotate;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.onmusic > div {
  width: 70px;
  height: 30px;
  border-radius: 30px;
  font-size: 18px;
  color: #27570b;
  background-color: #f4f4df;
  box-shadow: 0 0 5px #808080;
  margin-left: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
  opacity: 0.5;
}

.onmusic > div > i:hover {
  cursor: pointer;
  transform: scale(1.2, 1.2);
}
.onmusic > div:hover {
  opacity: 0.8;
}
</style>