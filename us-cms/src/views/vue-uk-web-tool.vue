<template>
  <div class="vue-web-tool-uk">
    <hello-world
      :canShow="true"
      :msg="'vue3 + vite + microApp 微服务项目尝试'"
    ></hello-world>
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

    }
    return {
      ...toRefs(state),
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>
.vue-web-tool-uk{
  text-align: center;
}
</style>
