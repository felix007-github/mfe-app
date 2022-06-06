<template>
  <div>
    <micro-app
      name='vueConsoleMs'
      :url='url'
      baseroute='/vue-console-ms'
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

<script>
import config from '../utils/config'

export default {
  name: 'vue-console-ms',
  data () {
    return {
      url: `${config.vueConsoleMs}/vue-console-ms`,
      microAppData: { msg: '来自基座的数据' }
    }
  },
  methods: {
    handleCreate () {
      console.log('child-vue2 创建了')
    },

    handleBeforeMount () {
      console.log('child-vue2 即将被渲染')
    },

    handleMount () {
      console.log('child-vue2 已经渲染完成')

      setTimeout(() => {
        this.microAppData = { msg: '来自基座的新数据' }
      }, 2000)
    },

    handleUnmount () {
      console.log('child-vue2 卸载了')
    },

    handleError () {
      console.log('child-vue2 加载出错了')
    },

    handleDataChange (e) {
      this.$router.replace({
        name: 'home'
      })
    }
  }
}
</script>

<style>
</style>
