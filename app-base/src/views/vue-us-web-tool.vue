<template>
  <div class="vue-web-tool-us">
    {{ myData }}
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: 'vue-us-web-tool',
  setup() {
    const state = reactive({
      myData: '21321321'
    })
    const methods = {

    }
    return {
      ...methods,
      ...toRefs(state)
    }
  }
}
</script>

<style>
</style>
