<template>
  <div class="vue-us-cms">
    <micro-app
      name='us-cms'
      :url='url'
      :data='microAppData'
      baseroute='/us-cms'
      @created='handleCreate'
      @beforemount='handleBeforeMount'
      @mounted='handleMount'
      @unmount='handleUnmount'
      @error='handleError'
      @datachange='handleDataChange'
    ></micro-app>
  </div>
</template>

<script lang="ts">
import config from '@/utils/config'
import { reactive, toRefs, getCurrentInstance } from "vue";
export default {
  name: 'us-cms',
  setup() {
    const state = reactive({
      url: `${config.uscms}/us-cms/`,
      microAppData: { msg: '来自基座的数据' }
    })
    const { proxy } = getCurrentInstance()
    const that = proxy.$root
    const methods = {
      handleCreate () {
        console.log('us-cms 创建了')
      },

      handleBeforeMount () {
        console.log('us-cms 即将被渲染')
      },

      handleMount () {
        console.log('us-cms 已经渲染完成')

        setTimeout(() => {
          state.microAppData = { msg: '来自基座的新数据' }
        }, 2000)
      },

      handleUnmount () {
        console.log('us-cms 卸载了')
      },

      handleError () {
        console.log('us-cms 加载出错了')
      },
      handleDataChange (e) {
        that.$router.replace({
          name: 'home'
        })
      }
    }
    return {
      ...methods,
      ...toRefs(state)
    }
  }
}
</script>