<template>
  <div id="loader-wrapper" class="flex row row-center col-center">
    <div id="mainloader" class="loader">
      <div class="loader-inner ball-pulse flex row row-center">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="load_title">{{ text }}</div>
  </div>
</template>
<script>
export default {
  name: 'Loaaing',
  data () {
    return {
      text: '正在加载系统资源，请稍后… '
    }
  }
}
</script>
