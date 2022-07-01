<template>
  <div class="table-main">
    <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
      <el-table-column 
        v-for="(item, index) in tableColumnDatas"
        :key="index"
        :width="item.width"
      >
        <template #header>
          <div class="table-header-item is-flex col-center">
            <span>{{ item.label }}</span>
            <el-icon><CaretBottom /></el-icon>
          </div>
        </template>
        <template #default="scope">
          <tpl-parser
            :tplType="item.value"
            :itemData="scope.row"
            @viewDetail="viewDetail"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import TplParser from "@/components/TplParser/index.vue";
@Options<MyTable>({
  props: {
    tableData: Array,
    activeType: String,
    tableLoading: Boolean
  },
  components: {
    "tpl-parser": TplParser
  },
  computed: {
    tableColumnDatas() {
      if (this.activeType === "active") {
        return [
          { label: "Session", value: "session", width: 130 },
          { label: "HB/SB", value: "hb_sb" },
          { label: "Status", value: "status" },
          { label: "Priority", value: "priority" },
          { label: "Actions", value: "actions" },
          { label: "Created at", value: "created_at" }, 
          { label: "Last motified", value: "last_motified" }
        ]
      } else {
        return [
          { label: "Session", value: "session", width: 130 },
          { label: "HB/SB", value: "hb_sb" },
          { label: "Act Chap", value: "act_chap" },
          { label: "Act Sec", value: "act_sec" },
          { label: "Effective Date", value: "effective_date" },
          { label: "Normcite", value: "created_at" }, 
          { label: "SubSect", value: "subSect" },
          { label: "Multi", value: "multi" },
          { label: "AU Priority", value: "au_priority" },
          { label: "Created at", value: "created_at" },
          { label: "Completed at", value: "completed_at" }
        ]
      }
    }
  }
})
export default class MyTable extends Vue {
  getRowValue(scope, item) {
    return scope.row[item.value]
  }
  viewDetail() {
    this.$emit('viewDetail')
  }
}
</script>
<style lang="scss" scoped>
.table-main{
  margin-top: 15px;
  :deep(.el-table){
    .cell{
      line-height: 40px;
    }
    tr:hover{
      >td.el-table__cell{
        background-color: #FAFAFA;
      }
    }
    .table-header-item{
      color: #616161;
      font-weight: 700;
      font-size: 16px;
      white-space: nowrap;
      i{
        color: #00172E;
        margin-left: 5px;
      }
    }
  }
  .action-box {
    :deep(.el-progress-circle){
      height: 30px !important;
    }
  }
}
</style>