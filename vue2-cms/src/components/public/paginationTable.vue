<template>
  <div class="pagination-table">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      background
      :current-page="currentPage"
      :page-sizes="[5,10,15,20]"
      :page-size="pagesize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import Vue from "vue";
import { Pagination } from "element-ui";
Vue.use(Pagination);
export default {
  name: "PaginationTable",
  props: {
    total: Number,
    currentPage: Number,
    pagesize: Number
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("sizeChange", size);
      //   console.log(size);
    },
    handleCurrentChange(page) {
      this.$emit("pageChange", page);
      //   console.log(page);
    },
    handlePrevClick(page) {
      this.$emit("pageChange", page);
      //   console.log(page);
    },
    handleNextClick(page) {
      this.$emit("pageChange", page);
      //   console.log(page);
    }
  }
};
</script>
<style lang="less" scoped>
.pagination-table{
  background-color: #ffffff;
  display: inline-block;
}
</style>


