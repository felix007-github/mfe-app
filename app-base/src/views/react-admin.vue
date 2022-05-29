<template>
  <div class="react-admin">
    <micro-app
      name='react-admin'
      :url='url'
      :data='microAppData'
      baseroute='/react-admin'
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
  name: 'react-admin',
  setup() {
    const state = reactive({
      url: `${config.reactAdmin}/react-admin/`,
      microAppData: { msg: '来自基座的数据' }
    })
    const { proxy } = getCurrentInstance()
    const that = proxy.$root
    const methods = {
      handleCreate () {
        console.log('react-admin 创建了')
      },

      handleBeforeMount () {
        console.log('react-admin 即将被渲染')
      },

      handleMount () {
        console.log('react-admin 已经渲染完成')

        setTimeout(() => {
          state.microAppData = { msg: '来自基座的新数据' }
        }, 2000)
      },

      handleUnmount () {
        console.log('react-admin 卸载了')
      },

      handleError () {
        console.log('react-admin 加载出错了')
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
