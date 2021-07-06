<template>
  <div id="collection">
    <div class="collectiontop">
      <button ref="ontime">按时间排序</button>
      <button ref="onletter">按首字母排序</button>
    </div>
    <div class="collectionmenu">
      <div
        @click="topage(item.c_id)"
        v-for="item in collectiondata"
        :key="item.id"
      >
        <h3>{{ item.c_name }}</h3>
        <p>{{item.time}}</p>
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
      collectiondata: "",
    };
  },
  created() {
    //默认按时间排序 1
    this.getdata(1);
  },
  mounted() {
    this.$refs.ontime.addEventListener('click',()=>{
      this.getdata(1);
    })
    this.$refs.onletter.addEventListener('click',()=>{
      this.getdata(2);
    })
  },
  methods: {
    topage(id) {
      this.$router.push({
        path: "/learning/" + id,
        query: {
          p: 0,
        },
      });
    },
    getdata(type) {
      instance({
        method: "post",
        url: "/Justdoit/user/collection/collectionselect.php",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          userid: this.$store.state.currentUser,
          type
        }),
      }).then((res) => {
        this.collectiondata = res.data;
      });
    },
  },
};
</script>

<style scoped>
.collectiontop {
  width: 1100px;
  height: 100px;
  margin: auto;
  display: flex;
  align-items: center;
}
.collectiontop > button {
  width: 100px;
  height: 40px;
  background-color: #bddd6a;
  margin: 20px;
  border-radius: 5px;
  border: 0;
  color: #ffffff;
  font-weight: 600;
}
.collectiontop > button:focus {
  outline: 0;
}
.collectiontop > button:hover {
  background-color: #aed647;
}
.collectionmenu {
  width: 1100px;
  height: 1100px;
  margin: auto;
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.collectionmenu > div {
  width: 200px;
  height: 100px;
  background-color: #ffffff67;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px #bbbbbb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.collectionmenu > div h3 {
  margin: 0;
  color: #058b0086;
  text-align: center;
}
.collectionmenu > div:hover {
  box-shadow: 0 0 5px #7a7a7a;
}
.collectionmenu > div p{
  margin: 0;
  color: #00000079;
}
</style>