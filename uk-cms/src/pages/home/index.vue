<template>
  <div class="home-page">
    <h1>us-legislation-cms</h1>
  </div>
</template>
<script>
export default {
  name: 'home-page',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(10).fill(item)
    }
  },
  methods:{
    tolinkBaseLoay() {
      if(window.__MICRO_APP_ENVIRONMENT__){
        window.microApp.dispatch({ type: 'linkHome' });
      }
    }
  }
}
</script>

<style lang="less">
.home-page{
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  background-image: url('~@/assets/images/TVbg.svg');
  h1{
    text-align: center;
    padding-top: 20vh;
  }
}
</style>