<template>
  <div class="notify-message-box is-flex" :style="{ left: leftPx }">
    <span v-if="msgType === 'success'" class="success">✔</span>
    <span v-if="msgType === 'error'" class="error">✖</span>
    <div class="message-right-text">
      {{ msgContet }}
    </div>
  </div>
</template>
<script>
export default {
  name: "NotifyMessage",
  props: ["content", "duration", "remove", "type"],
  data() {
    return {
      leftPx: null,
      msgContet: null,
      msgType: "success",
    }
  },
  created() {
    this.msgType = this.type || "success";
    this.msgContet = this.content;
  },
  mounted() {
    const time1 = setTimeout(()=>{
      this.leftPx = "48px"
    }, 0)
    const timeout = setTimeout(()=>{
      this.remove();
      clearTimeout(time1)
      clearTimeout(timeout)
    }, this.duration || 2500)
  }
}
</script>
<style lang="scss" scoped>
.notify-message-box{
  position: fixed;
  left: -666px;
  bottom: 60px;
  overflow: hidden;
  background: #000000;
  height: 50px;
  box-shadow: 0px 4px 8px rgba(3, 11, 37, 0.3);
  border-radius: 6px;
  align-items: center;
  padding: 0 20px;
  z-index: 99999;
  transition: all 0.25s ease-in;
  >span{
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    margin-right: 10px;
    text-align: center;
    margin-bottom: 2px;
  }
  .success{
    color: #ffffff;
    background-color: #52C41A;
  }
  .error{
    color: #222222;
    background-color: #BC0000;
  }
  .message-right-text{
    min-width: 100px;
    color: #ffffff;
  }
}
</style>