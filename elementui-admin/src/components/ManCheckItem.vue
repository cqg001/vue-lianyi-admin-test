<template>
  <div id="ManCheckItem">
    <div class="Item">
      <div class="logo">
        <img :src="headImg" class="SocietyLogo" alt="" width="50%" style="margin-top:20%;margin-left:5%">
        <p style="margin-top:15%">{{ name }}</p>
        <el-button style="margin-top:0;margin-left:0;width:70%;height:40px" round @click="thanks">赞赏</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManCheckItem",
  props: ["headImg", "name"],
  mounted() {
    console.log(this.ImgUrl);
    let img = document.getElementsByClassName('SocietyLogo');
    // img[0].src = this.ImgUrl
    console.log(img[0].src);

  },
  methods: {
    thanks() {
      console.log("谢谢")
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>感谢<i class="el-icon-cold-drink"></i></strong>'
      });
    }
  }
}
</script>

<style>
.Item {
  width: 200px;
  height: 300px;
  background-color: #fff;
  box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, .1);
  border-radius: 8px;
  margin-left: 25px;
  margin-top: 20px;
  text-align: center;
}


</style>