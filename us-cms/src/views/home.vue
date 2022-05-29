<template>
  <div class="home-page">
    <div class="app-box">
      <img :src="logoPath" alt="">
      <div class="text">
        213123213123
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'homePage',
  setup() {
    const that = getCurrentInstance().proxy.$root;
    const logoPath = new URL('../assets/images/Bia.png', import.meta.url).href
    return {
      logoPath
    }
  }
})
</script>
<style lang="less" scoped>
.home-page{
  width: 100%;
  height: 100vh;
  background-color:#f0f2f5;
  background-image: url('@/assets/images/TVbg.svg');
  .app-box{
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .text{
      margin-top: 30px;
      font-size: 20px;
    }
  }
}
</style>
