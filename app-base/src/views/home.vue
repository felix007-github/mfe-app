<template>
  <div class="home-page">
    <div class="app-box">
      <div class="item-data" @click="toLinkPage('/react-admin')">
        <div><img src="@/assets/timg.png" alt=""></div>
        react-admin
      </div>
      <div class="item-data" @click="toLinkPage('/us-cms')">
        <div><img src="@/assets/images/Bia.png" alt=""></div>
        us-legislation-cms
      </div>
      <div class="item-data" @click="toLinkPage('/uk')">
        <div><img src="@/assets/images/logo_top.png" alt=""></div>
        uk-legislation-cms
      </div>
    </div>
    <div class="footer-bottom">vue3 + vite + microApp 前端微服务</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'homePage',
  setup() {
    const { proxy } = getCurrentInstance();
    const that = proxy.$root;
    const toLinkPage = (path: string) => {
      // location.href = path
      that.$router.push({ path })
    }
    return {
      toLinkPage
    }
  }
})
</script>
<style lang="less" scoped>
.home-page{
  width: 100%;
  height: 100vh;
  background-color:#f0f2f5;
  background-image: url('~@/assets/images/TVbg.svg');
  .app-box{
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    .item-data{
      margin: 20px;
      width: 180px;
      padding: 20px;
      cursor: pointer;
      text-align: center;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0 2px 12px 0 #c8cfcc;
      img{
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
      }
    }
  }
  .footer-bottom{
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 50px;
    color: rgba(0,0,0,.45);
  }
}
</style>
