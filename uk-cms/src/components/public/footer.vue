<template>
  <footer class="bottom-my-footer">
    <div class="describe-div" v-if="!thisLoading">
      <img src="../../assets/images/timg.png" alt />
      <div class="font-msg">
        <p>夕阳沉落在海水深处却不见浪花翻滚，淡淡的只留下一个让人沉思的背影。</p>
        <p>雨落是晚风中的殇，带着晨曦的翘首滑落最后的伤痕！雨落含羞，淡抹嫣红！</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "FooterCom",
  computed: {
    thisLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-my-footer {
  width: 100%;
  margin: 10px 0;
  .describe-div {
    text-align: center;
    .font-msg {
      display: inline-block;
      vertical-align:middle;
      p {
        font-size: 13px;
        line-height: 1.5em;
      }
    };
    > img {
      width: 50px;
      vertical-align:middle;
      margin-right: 10px;
    }
  }
}
</style>