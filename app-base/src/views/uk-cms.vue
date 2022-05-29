<template>
  <div class="vue-uk-cms">
    <micro-app
      name='uk-cms'
      :url='url'
      :data='microAppData'
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
  name: 'uk-cms',
  setup() {
    const state = reactive({
      url: `${config.ukcms}/uk-cms/`,
      microAppData: { msg: '来自基座的数据' }
    })
    const { proxy } = getCurrentInstance()
    const that = proxy.$root
    const methods = {
      handleCreate () {
        console.log('uk-cms 创建了')
      },

      handleBeforeMount () {
        console.log('uk-cms 即将被渲染')
      },

      handleMount () {
        console.log('uk-cms 已经渲染完成')

        setTimeout(() => {
          state.microAppData = { msg: '来自基座的新数据' }
        }, 2000)
      },

      handleUnmount () {
        console.log('uk-cms 卸载了')
      },

      handleError () {
        console.log('uk-cms 加载出错了')
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