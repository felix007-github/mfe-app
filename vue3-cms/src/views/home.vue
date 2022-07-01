<template>
  <div class="vue-web-tool-uk">
    <hello-world
      :canShow="true"
      :msg="'vue3 + vite + microApp 微服务项目尝试'"
    ></hello-world>
    <el-button type="danger" round>Danger</el-button>
    <el-icon><Coin /></el-icon>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@c/HelloWorld.vue";
import { reactive, toRefs, getCurrentInstance } from "vue";
export default {
  name: 'vue-uk-web-tool',
  components: {
    'hello-world': HelloWorld
  },
  setup() {
    const that = getCurrentInstance().proxy.$root
    const state = reactive({
      myData: '12321313'
    })
    const methods = {
      todolist() {
        console.log(that)
      }
    }
    return {
      ...toRefs(state),
      ...methods
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-web-tool-uk{
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color:#f0f2f5;
  background-image: url('@/assets/images/TVbg.svg');
}
</style>
