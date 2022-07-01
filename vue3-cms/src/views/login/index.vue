<template>
  <div class="login-page">
    <div class="top-legislation-logo is-flex col-center row-center">
      <img src="@/assets/images/logo_top.png" alt="">
      Legislation | US
    </div>
    <div class="form-item">
      <el-input :class="{isred: showRequest.username}" v-model="ruleForm.username" type="username" size="large" placeholder="Legal ID" />
      <p v-show="showRequest.username">Legal ID is required</p>
    </div>
    <div class="form-item">
      <el-input :class="{isred: showRequest.username}" v-model="ruleForm.password" type="password" size="large" placeholder="Password" />
      <p v-show="showRequest.password">Password is required</p>
    </div>
    <div class="form-item login-btn is-flex">
      <el-button type="primary" size="large" :loading="btnLoading" @click="submitForm">Log in</el-button>
    </div>
    
    <div class="form-item tip">
      <p>If you continue to experience problems</p>
      <p> please <a href="mailto:LNGCHNDamoTechnicalSupport@lexisnexis.com">contact Legislation team.</a> </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
export default class Login extends Vue {
  btnLoading = false;
  showRequest = {
    username: false,
    password: false
  };
  ruleForm = {
    username: "",
    password: ""
  };
  submitForm() {
    this.btnLoading = true
    this.showRequest.username = !this.ruleForm.username;
    this.showRequest.password = !this.ruleForm.password;
    setTimeout(()=>{
      this.btnLoading = false;
      this.showRequest.username = false;
      this.showRequest.password = false;
      this.$router.replace({
        name: 'taskCenter'
      })
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/index.scss";
</style>