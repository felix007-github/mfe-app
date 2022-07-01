<template>
  <div class="tack-center-page is-flex row-center">
    <div class="left-menu">
      <img src="@/assets/images/logo_top.png" alt="logo" @click="tolinkHome">
      <div class="menu-item is-flex row-center col-center">
        <svg class="iconpark-icon" fill="currentColor"><use href="#tasksing"></use></svg>
        <div class="name-text">Task center</div>
      </div>
    </div>
    <main class="right-content-main">
      <top-headers></top-headers>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Affected Unit Verification" name="first">
          <auv  @viewDetail="viewDetail"/>
        </el-tab-pane>
        <el-tab-pane label="Code Update" name="second"></el-tab-pane>
        <el-tab-pane label="Note Edit" name="third"></el-tab-pane>
      </el-tabs>
    </main>
    <task-detail ref="taskDetails" />
  </div>
</template>
<script lang="ts">
import Auv from "./components/Auv.vue";
import { Options, Vue } from "vue-class-component";
import TopHeader from "./components/TopHeaders.vue";
import TaskDetail from "./components/TaskDetail.vue";
@Options<TaskCenter>({
  components: {
    "auv": Auv,
    "top-headers": TopHeader,
    "task-detail": TaskDetail
  }
})
export default class TaskCenter extends Vue {
  taskVisible = false;
  activeName = 'first';
  declare $refs: {
    taskDetails: TaskDetail
  }
  viewDetail() {
    this.$refs.taskDetails.showThis()
  }
  tolinkHome() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.dispatch({type: 'home'});
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/index.scss";
</style>