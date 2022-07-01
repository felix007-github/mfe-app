<template>
  <main class="lib-page-main">
    <micro-app-lib
      :shadowDOM="true"
      name='caasLibname1'
      :url="'http://localhost:8885/'"
      :data="microAppData"
      @datachange="handleDataChange"
    ></micro-app-lib>
  </main>
</template>

<script>
export default {
  name: 'lib-com',
  data () {
    return {
      microAppData: {
        type: 'type1'
      }
    }
  },
  methods: {
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
