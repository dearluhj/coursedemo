<template>
  <div id="lunbo">
    <nav class="nav1-menu moderate">
      <span>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
      <p></p>
      <div>
        <a href=""><img src="~lunbo/slide1.jpg" /></a>
        <a href=""><img src="~lunbo/slide2.jpg" /></a>
        <a href=""><img src="~lunbo/slide3.jpg" /></a>
        <a href=""><img src="~lunbo/slide4.jpg" /></a>
        <a href=""><img src="~lunbo/slide5.jpg" /></a>
        <a href=""><img src="~lunbo/slide6.jpg" /></a>
        <ul>
          <li class="glyphicon glyphicon-unchecked change"></li>
          <li class="glyphicon glyphicon-unchecked"></li>
          <li class="glyphicon glyphicon-unchecked"></li>
          <li class="glyphicon glyphicon-unchecked"></li>
          <li class="glyphicon glyphicon-unchecked"></li>
          <li class="glyphicon glyphicon-unchecked"></li>
        </ul>
      </div>
      <div>
        <img src="~lunbo/51clean.jpg" alt="" />
      </div>
      <div>
        <img src="~lunbo/introduce.png" alt="" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted() {
    (function () {
      let curIndex = 0,
        nextIndex = 1,
        imgs = $(".nav1-menu>div:nth-of-type(1) img"),
        btn = $(".nav1-menu>div:nth-of-type(1)>ul>li");
      let len = imgs.length,
        len_btn = btn.length;
      // console.log(len);
      // console.log(imgs[curIndex]);
      // console.log(imgs.eq(0));
      // console.log(btn);

      //按钮事件
      btn.bind("click", function () {
        if (curIndex === $(this).index()) {
          return;
        }
        nextIndex = $(this).index();
        move();
        // console.log(curIndex);
      });

      //运动函数
      function move() {
        imgs.eq(curIndex).fadeOut(500);
        imgs.eq(nextIndex).fadeIn(500);
        btn.eq(curIndex).removeClass("change");
        btn.eq(nextIndex).addClass("change");
        // console.log(curIndex,nextIndex);
        curIndex = nextIndex;
        nextIndex++;

        if (nextIndex === len) {
          nextIndex = 0;
        }
      }
      //鼠标移入时停止计时器，移出时开启计时器
      let time = null;
      $(".nav1-menu>div:nth-of-type(1)")
        .hover(
          function () {
            clearInterval(time);
            // console.log('clear');
          },
          function () {
            time = setInterval(move, 5000);
            // console.log('set');
          }
        )
        .trigger("mouseout");
    })();
  },
};
</script>

<style scoped>
.nav1-menu {
  position: relative;
  z-index: 0;
  width: 1200px;
  height: 500px;
  margin-top: 30px;
  padding: 20px;
  display: grid;
  display: -ms-grid;
  -ms-grid-columns: 70% 30%;
  -ms-grid-rows: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-template-columns: 70% 30%;
}
.nav1-menu > div {
  margin: 10px;
  /* background-color: #fff3d4; */
  box-shadow: 0 0 10px #b1b1b1;
  border-radius: 5px;
  overflow: hidden;
}
.nav1-menu > div:nth-of-type(1) {
  grid-area: 1/1/3/2;
  -ms-grid-row: 1/3;
  -ms-grid-column: 1/2;
  grid-row: 1/3;
  grid-column: 1/2;
  position: relative;
  overflow: hidden;
  display: flex; /* 控制轮播按钮的位置 */
  justify-content: center;
  align-items: flex-end;
}
.nav1-menu > div:nth-of-type(1) > a {
  width: 793px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.nav1-menu > div:nth-of-type(1) > a > img {
  width: 793px;
  height: 440px;
  display: none;
}
.nav1-menu > div:nth-of-type(1) > a:nth-of-type(1) > img {
  display: inline;
}
.nav1-menu > div:nth-of-type(1) > ul > li {
  color: wheat;
  opacity: 0.5;
  cursor: pointer;
  width: 30px;
  height: 50px;
  text-align: center;
  line-height: 3em;
}
.nav1-menu > div:nth-of-type(1) > ul > .change {
  opacity: 1;
}
.nav1-menu > div:nth-of-type(n + 1) > img {
  width: 328px;
  height: 210px;
}

/* 左侧方块 */
span {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 100px;
  left: -80px;
  z-index: -1;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 40px;
  transform: translate(-50%, -50%) rotateZ(45deg) rotate3d(-1, 1, 0, 45deg);
  animation-name: rotate;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotateZ(45deg) rotate3d(-1, 1, 0, 45deg);
  }
  to {
    transform: translate(-50%, -50%) rotateZ(45deg) rotate3d(-1, 1, 0, 45deg)
      rotate3d(1, 1, 1, 360deg);
  }
}

span > div {
  position: absolute;
  z-index: -1;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
}
span > div:nth-child(1) {
  background: #ff0000;
  transform-origin: bottom;
  transform: rotateX(-90deg);
  opacity: 0.8;
}

span > div:nth-child(2) {
  background: #ffaa00;
  transform-origin: top;
  transform: rotateX(90deg);
  opacity: 0.8;
}

span > div:nth-child(3) {
  background: #ffffff;
  transform-origin: right;
  transform: rotateY(90deg);
  opacity: 0.8;
}

span > div:nth-child(4) {
  background: #ffff00;
  transform-origin: left;
  transform: rotateY(-90deg);
  opacity: 0.8;
}
span > div:nth-child(5) {
  background: #00ff00;
  opacity: 0.8;
  transform: rotateY(180deg);
}

span > div:nth-child(6) {
  background: #0055ff;
  opacity: 0.8;
  transform: translateZ(80px);
}
.nav1-menu > p {
  width: 100px;
  height: 100px;
  background-color: #aaaaaa;
  border-radius: 50%;
  position: absolute;
  left: -130px;
  top: 150px;
  opacity: 0.5;
  transform: rotateX(80deg);
  filter: blur(15px);
}
</style>


