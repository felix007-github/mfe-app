<template>
  <div class="top-header-box is-flex col-center row-between">
    <div class="left-box-cell flex col-center">
      <el-icon @click="backPage"><Back /></el-icon>
      <div class="au-msg-box flex col-center">
        <svg class="iconpark-icon" fill="currentColor"><use href="#headermenu"></use></svg>
        <div class="text-content">
          <div class="top-text flex col-center">
            <span class="bold-text">2021 Minn. H.F. No. 33</span>
            <span class="status-sing">New</span>
          </div>
          <div class="bottom-text">Affected Unit Verification </div>
        </div>
      </div>
    </div>
    <div class="right-box-cell">
      <div class="user-cell is-flex col-center row-center">LL</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options<TopHeader>({})
export default class TopHeader extends Vue {
  backPage() {
    this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.top-header-box{
  height: 55px;
  padding: 0 25px;
  box-shadow: inset 0px -1px 0px #D6D9E0;
  .left-box-cell{
    i{
      cursor: pointer;
      font-size: 25px;
    }
    .text-content{
      line-height: 24px;
      margin-left: 15px;
    }
    .au-msg-box{
      margin-left: 20px;
    }
    .bold-text{
      color: $fcb;
      font-weight: 700;
      font-size: 14px;
    }
    .bottom-text{
      color: #9E9E9E;
      font-weight: 400;
      font-size: 14px;
    }
    .status-sing{
      padding: 0 5px;
      color: #4CAF50;
      background: #E8F5E9;
      border: 1px solid #4CAF50;
      border-radius: 2px;
      margin-left: 8px;
    }
  }
  .user-cell{
    width: 32px;
    height: 32px;
    color: $fc;
    text-align: center;
    background: #4DB6AC;
    border-radius: 50%;
  }
}
</style>