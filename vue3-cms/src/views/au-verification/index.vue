<template>
  <div class="au-verification-page">
    <top-header />
    <div class="auv-content-main is-flex">
      <div class="left-content">

      </div>
      <div class="task-content is-flex">
        <section class="tasklist-section">
          <task-muster />
        </section>
        <div class="right-box flex row-center">
          <div class="icon-item flex row-center col-center">
            <svg class="iconpark-icon" fill="currentColor"><use href="#alltask"></use></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TopHeader from "./components/TopHeader.vue";
import TaskMuster from "./components/TaskMuster.vue";
import { Options, Vue } from "vue-class-component";
@Options<AuVerification>({
  components: {
    "top-header": TopHeader,
    "task-muster": TaskMuster
  }
})
export default class AuVerification extends Vue {
  
}
</script>
<style lang="scss" scoped>
@import "./scss/index.scss";
</style>