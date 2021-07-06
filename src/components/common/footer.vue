<template>
  <div id="footer">
    <footer class="foot-menu">
      <div class="divtop">
        <img src="../../assets/img/logo/justlogo.gif" alt="" />
        <img src="../../assets/img/logo/logo.png" alt="" />
      </div>
      <div class="divdown">
        <a href="#">关于我们</a>
        <a href="#">帮助中心</a>
        <a href="#">添加微信</a>
        <a href="#">用户协议</a>
        <a href="#">联系方式</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.foot-menu {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  box-shadow: 0 0 5px #9f9f9f;
  display: flex;
  flex-direction: column;
}
.foot-menu > .divtop {
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot-menu > .divtop > img:first-child {
  height: 50px;
}
.foot-menu > .divtop > img:last-child {
  height: 20px;
}
.foot-menu > .divdown {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.foot-menu>.divdown>a,.foot-menu>.divdown>a:visited{
  text-decoration: none;
  color: black;
  margin: 0 30px;
}
</style>