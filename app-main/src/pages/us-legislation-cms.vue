<template>
  <main class="uk-page-main">
    <micro-app
      name='usLegislationCms'
      :url='url'
      baseroute='/us'
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
  name: 'us-legislation-cms',
  components: {
    'app-loading': Loading
  },
  data () {
    return {
      pageLoding: false,
      url: `${config.usLegislationCms}`,
      microAppData: {
        usData: '这里传递信息'
      }
    }
  },
  methods: {
    handleCreate () {
      this.pageLoding = true
    },

    handleBeforeMount () {
      console.log('us-legislation-cms 即将被渲染')
    },

    handleMount () {
      setTimeout(() => {
        this.microAppData = {
          usData: '信息改变了'
        }
        this.pageLoding = false
      }, 100)
    },

    handleUnmount () {
      console.log('us-legislation-cms 卸载了')
    },

    handleError () {
      console.log('us-legislation-cms 加载出错了')
    },

    handleDataChange (e) {
      console.log(e)
      this.$router.push({ path: '/uk/task-center' })
    }
  }
}
</script>
