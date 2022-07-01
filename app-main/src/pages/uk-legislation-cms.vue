<template>
  <main class="uk-page-main">
    <micro-app
      name='ukLegislationCms'
      :url='url'
      baseroute='/uk'
      :data='microAppData'
      @created='handleCreate'
      @beforemount='handleBeforeMount'
      @mounted='handleMount'
      @unmount='handleUnmount'
      @error='handleError'
      @datachange='handleDataChange'
    ></micro-app>
    <app-loading v-if="pageLoding"/>
  </main>
</template>

<script>
import config from '@/utils/config'
import Loading from '@/components/loading.vue'
export default {
  name: 'uk-legislation-cms',
  components: {
    'app-loading': Loading
  },
  data () {
    return {
      pageLoding: false,
      url: `${config.ukLegislationCms}`,
      microAppData: { msg: '基座的数据' }
    }
  },
  methods: {
    handleCreate () {
      this.pageLoding = true
    },

    handleBeforeMount () {
      // console.log('uk-legislation-cms 即将被渲染')
    },

    handleMount () {
      this.microAppData = { msg: '基座的新数据' }
      this.pageLoding = false
    },

    handleUnmount () {
      // console.log('uk-legislation-cms 卸载了')
    },

    handleError () {
      console.log('uk-legislation-cms 加载出错了')
    },

    handleDataChange (e) {
      const data = e.detail.data
      if (data.type) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style>
</style>
