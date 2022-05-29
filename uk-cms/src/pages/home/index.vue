<template>
  <div class="home-page">
    <h1>us-legislation-cms</h1>
    <img src="@/assets/images/Bia.png" alt="">
    <div><span class="el-icon-platform-eleme"></span></div>
  </div>
</template>
<script>
export default {
  name: 'home-page',
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>

<style lang="less">
.home-page{
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  text-align: center;
  background-image: url('~@/assets/images/TVbg.svg');
  h1{
    text-align: center;
    padding-top: 100px;
  }
}
</style>