<template>
  <div class="hellow-world">
    <img alt="Vue logo" src="../assets/images/Bia.png" />
    <h1>{{ msg }}</h1>
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
    const state = reactive({
      count: 1
    })
    const emitData = () => {
      emit('setNum', state.count)
    }
    return {
      emitData,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-btn{
  margin: 10px;
}
</style>
