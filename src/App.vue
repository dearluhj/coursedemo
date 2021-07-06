<template>
  <div id="app">
    <router-view name="viewtop"></router-view>

    <transition :name="transitionname" mode="out-in">
      <router-view name="viewmain"></router-view>
    </transition>

    <router-view name="viewbottom"></router-view>

    <pgy></pgy>
    <cloud></cloud>
  </div>
</template>

<script>
import pgy from "./common/dynamic/pugongying.vue";
import cloud from "./common/dynamic/cloud.vue";

export default {
  name: "App",
  data() {
    return {
      transitionname: "slide-main",
      coursename: "ssss"
    };
  },
  components: {
    pgy,
    cloud,
  }
};
</script>

<style lang="scss">
@import url("./common/bootstrap/css/bootstrap.min.css");

* {
  margin: 0;
  padding: 0;
}

input:focus,
button:focus {
  outline: 0;
}
button:active {
  transform: scale(0.95);
}

body {
  background-color: #f0f0f1;
  // width: 100%;
  // height: 100%;
}

/*定义滚动条样式*/
body::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*定义滚动条轨道内阴影+圆角*/
body::-webkit-scrollbar-track {
  box-shadow: 0 0 2px #bebebe;
  border-radius: 2px;
  background-color: #e4e4e4b9;
}
/*定义滑块内阴影+圆角*/
body::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: 0 0 5px #bebebe;
  background-color: #006eff57;
}
.moderate {
  margin: auto;
}

.slide-main-enter-active,
.slide-main-leave-active {
  will-change: transform;
  transition: all 0.3s;
}
.slide-child-enter-active,
.slide-child-leave-active {
  will-change: transform;
}
// .slide-right-enter,
// .slide-right-leave-active {
//   opacity: 0;
// }
// .slide-right-leave{
//   opacity: 0;
// }
.slide-main-enter {
  opacity: 0;
}
.slide-main-leave-active {
  opacity: 0;
}

.slide-child-enter-active {
  opacity: 1;
  transition: 1.5s;
} //两者位置不可更换
.slide-child-enter {
  opacity: 0;
  transform: scale(0) rotateY(720deg);
}

.slide-child-leave-active {
  opacity: 0;
  transform: translate(100%);
  transition: 0.5s;
}
.slide-child-leave {
  opacity: 1;
}
</style>

