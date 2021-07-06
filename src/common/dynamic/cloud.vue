<template>
  <div id="cloud" ref="cloud">
    <!-- <i class="glyphicon glyphicon-cloud"></i> -->
  </div>
</template>

<script>
export default {
  mounted() {
    let colors = [
      "#a59cef",
      "#a59cef",
      "#ddf40b",
      "#f2a20d",
      "#e31cb1",
      "#0d0df2",
      "#ff0006",
      "#efea10",
      "#149feb",
      "#f206f9",
    ];

    document.documentElement.addEventListener("click", (e) => {
      // console.log(e.clientX, e.clientY);

      let cl = colors[Math.floor(Math.random() * 10)];
      let i = document.createElement("i");
      // this.$refs.cloud.innerHTML =`<i name='s${cl.slice(1)}' style='color: ${cl};font-size: 30px;position: fixed;z-index:5; top: ${e.clientY-12}px;left: ${e.clientX-12}px;' class='glyphicon glyphicon-cloud'></i>`;

      i.setAttribute("name", "s" + cl.slice(1));
      i.setAttribute(
        "style",
        `color: ${cl};font-size: 30px;position: fixed;z-index:5; top: ${
          e.clientY - 12
        }px;left: ${e.clientX - 12}px;`
      );
      i.setAttribute("class", "glyphicon glyphicon-cloud");

      try{
        this.$refs.cloud.appendChild(i);
      }catch(err){}
      

      // let str='.cloud i[name=s'+cl.slice(1)+']';
      // let i1=document.querySelectorAll(str)[0];

      
      document.querySelectorAll("#cloud i").forEach((items) => {
        $(items).fadeOut(1500);
        
        let timer1 = setInterval(() => {
          items.style.top = parseInt(items.style.top) - 1 + "px";
          if (items.style.display == "none") {
            clearInterval(timer1);
            try{
              this.$refs.cloud.removeChild(items)
            }catch(err){}
          }
        }, 5);

        
      });

      // $(i1).fadeOut(1500);

      // let timer1=setInterval(() => {
      //   i1.style.top=parseInt(i1.style.top)-1+'px';
      //   if (i1.style.display=='none') {
      //     clearInterval(timer1);
      //   }
      // }, 5);
    });
  },
};
</script>

<style scoped>
#cloud i {
  color: #f206f9;
  font-size: 25px;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>