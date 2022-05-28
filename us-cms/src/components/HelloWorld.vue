<template>
  <div class="hellow-world">
    <img alt="Vue logo" src="@/assets/timg.png" />
    <h1>{{ text }}</h1>
    <div class="box-btn" @click="emitData">emit num</div>
    <hello-world v-if="canShow" :msg="'vue3 + vite + microApp 微服务项目尝试'"></hello-world>
  </div>

</template>
<script lang="ts">
import { reactive, toRefs } from 'vue'
export default {
  name: 'HellowWorld',
  props: [ 'msg', 'canShow' ],
  setup(props, { emit }) {
    const { msg } = toRefs(props)
    const state = reactive({
      count: 1
    })
    const emitData = () => {
      emit('setNum', state.count)
    }
    return {
      state,
      emitData,
      text: msg.value,
    }
  }
}
</script>
<style lang="less" scoped>
.box-btn{
  margin: 10px;
}
</style>
