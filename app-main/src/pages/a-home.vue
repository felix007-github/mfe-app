<template>
  <div class="caas-shell-home-page">
    <div class="app-box">
      <div class="item-data" @click="toLinkPage('/uk/task-center')">
        <div><img src="~@/assets/logo_top.png" alt=""></div>
        uk-legislation-cms
      </div>
      <div v-if="showNs" class="item-data" @click="toLinkPage('/us-cms/task-center')">
        <div><img src="~@/assets/logo_top.png" alt=""></div>
        us-legislation-cms
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'homePage',
  data () {
    return {
      showNs: false
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      this.showNs = true
    }
  },
  methods: {
    toLinkPage (path) {
      // location.href = path
      this.$router.push({ path })
    }
  }
}
</script>
<style lang="less" scoped>
.caas-shell-home-page{
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
