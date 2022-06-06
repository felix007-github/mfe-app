<template>
  <div>
    <micro-app
      name='react-admin'
      :url='url'
      baseroute='/react-admin'
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
import config from '@/utils/config'

export default {
  name: 'react-admin',
  data () {
    return {
      url: `${config.reactAdmin}/react-admin/`,
      microAppData: { msg: '来自基座的数据' }
    }
  },
  methods: {
    handleCreate () {
      console.log('react-admin 创建了')
    },

    handleBeforeMount () {
      console.log('react-admin 即将被渲染')
    },

    handleMount () {
      console.log('react-admin 已经渲染完成')

      setTimeout(() => {
        this.microAppData = { msg: '来自基座的新数据' }
      }, 2000)
    },

    handleUnmount () {
      console.log('react-admin 卸载了')
    },

    handleError () {
      console.log('react-admin 加载出错了')
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
