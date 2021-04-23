<template>
  <div class="about">
    <ManCheckItem head-img="img/cqg.jpg" name="程麒阁"></ManCheckItem>
    <ManCheckItem head-img="img/lym.jpg" name="鲁一鸣"></ManCheckItem>
    <ManCheckItem head-img="img/lq.jpg" name="李强"></ManCheckItem>
  </div>
</template>
<script>
import ManCheckItem from "../components/ManCheckItem";
export default {
  data(){
    return {

    }
  },
  components:{
    ManCheckItem,
  }
}
</script>
<style>
	.about{
		padding-left: 10px;
    display: flex;
	}
</style>
