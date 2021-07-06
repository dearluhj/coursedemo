<template>
  <div>
    <advert></advert>
    <tabbar></tabbar>
    <music></music>
  </div>
</template>

<script>
import advert from "./common/advert.vue";
import tabbar from "./common/tabbar.vue";
import music from "../common/music/music.vue";

export default {
  components:{
    advert,
    tabbar,
    music
  }
}
</script>

<style scoped>

</style>