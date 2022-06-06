<template>
  <div class="home-page">
    <div class="app-box">
      <div class="item-data" @click="toLinkPage('/react-admin')">
        <div><img src="~@/assets/images/timg.png" alt=""></div>
        react-admin
      </div>
      <div class="item-data" @click="toLinkPage('/vue-console-ms')">
        <div><img src="~@/assets/images/Bia.png" alt=""></div>
        vue-console-ms
      </div>
      <div class="item-data" @click="toLinkPage('/uk/task-center')">
        <div><img src="~@/assets/images/logo_top.png" alt=""></div>
        uk-web-tool
      </div>
      <div class="item-data" @click="toLinkPage('/us/task-center')">
        <div><img src="~@/assets/images/logo_top.png" alt=""></div>
        us-web-tool
      </div>
      <div class="item-data" @click="toLinkPage('/uktemplate')">
        <div><img src="~@/assets/images/logo_top.png" alt=""></div>
        ul-template
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'homePage',
  methods: {
    toLinkPage (path) {
      // location.href = path
      this.$router.push({ path })
    }
  }
}
</script>
<style lang="less" scoped>
.home-page{
  width: 100%;
  height: 100vh;
  background-image: url('~@/assets/images/TVbg.svg');
  .app-box{
    position: fixed;
    top: 180px;
    left: 200px;
    display: flex;
    justify-content: center;
    .item-data{
      margin: 20px;
      width: 180px;
      padding: 20px;
      cursor: pointer;
      text-align: center;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 #c8cfcc;
      img{
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
