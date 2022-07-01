<template>
  <section class="auv-page">
    <div class="top-tabs-box is-flex col-center">
      <div class="is-flex col-center">
        <span class="item-tab" :class="{active: activeItem === 'active'}" @click="changeActive('active')">Active Tasks</span>
        <span class="center-line"></span>
        <span class="item-tab" :class="{active: activeItem === 'completed'}" @click="changeActive('completed')">Completed</span>
      </div>
      <div class="right-box">
        <svg class="iconpark-icon" @click="toFilter" fill="currentColor"><use href="#filter"></use></svg>
        <svg class="iconpark-icon"><use href="#setting" fill="currentColor"></use></svg>
      </div>
    </div>
    <!-- table active 部分 -->
    <my-table
      v-if="activeItem == 'active'"
      :tableData="tableData"
      :tableLoading="loading"
      :activeType="activeItem"
      @viewDetail="viewDetail"
    />
    <my-table
      v-if="activeItem == 'completed'"
      :tableData="tableData"
      :tableLoading="loading"
      :activeType="activeItem"
    />
    <!-- 分页 -->
    <pagination
      :totalNum="totalNum"
      :currentPage="currentPage"
      @pageChange="pageChange"
    />
  </section>
</template>
<script lang="ts">
import MyTable from "./MyTable.vue";
import { getTableData } from "@/api";
import { getCurrentInstance } from "vue";
import Pagination from "./Pagination.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    "my-table": MyTable,
    "pagination": Pagination
  }
})
export default class Auv extends Vue{
  thatApp = getCurrentInstance().appContext;
  loading = false;
  totalNum = 995;
  tableData = [];
  currentPage = 1;
  activeItem = 'active';
  changeActive(value: string):void {
    this.activeItem = value;
  }
  toFilter() {
    const $notifyMsg = this.thatApp?.config.globalProperties.$notifyMsg
    $notifyMsg({
      type: "success",
      content: "1231231"
    });
    return
  }
  pageChange(val: number): void {
    this.currentPage = val
  }
  viewDetail() {
    this.$emit('viewDetail')
  }
  async initData(): Promise<void> {
    try {
      this.loading = true;
      const res = await getTableData();
      if(res) {
        this.tableData = res.data["task_center_data"]
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
  mounted() {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/Auv.scss';
</style>