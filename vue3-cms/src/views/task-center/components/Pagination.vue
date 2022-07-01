<template>
  <div class="pagination-box is-flex col-center">
    <span class="pagination-text">1-{{ allPageNum }} of {{ totalNum }} items</span>
    <el-pagination
      :currentPage="currentPage"
      :page-size="10"
      layout="prev, pager, next"
      :total="totalNum"
      @currentChange="currentChange"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
@Options<Pagination>({
  props: {
    totalNum: Number,
    currentPage: Number
  },
  computed: {
    allPageNum()  {
      return Math.ceil(this.totalNum / 10)
    }
  }
})
export default class Pagination extends Vue{
  currentChange(value: number) {
    this.$emit("pageChange", value)
  }
}
</script>
<style lang="scss" scoped>
.pagination-box{
  padding: 10px 0;
  margin-top: 10px;
  justify-content: flex-end;
  .pagination-text{
    margin-right: 10px;
  }
  :deep(.el-pagination){
    .is-active {
      border-radius: 5px;
      border: 1px solid #425EF2;
    }
  }
}
</style>