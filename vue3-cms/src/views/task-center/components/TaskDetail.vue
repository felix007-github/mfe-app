<template>
  <el-dialog
    v-model="tableVisible"
    :title="detailTitle"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="my-header is-flex col-center">
        <div class="is-flex col-center">
          <div class="dialog-title-text">{{ detailTitle }}</div>
          <div class="sing-box">
            <tpl-parser
              :tplType="'actions'"
              :itemData="{
                actions: 11,
                action_total: 20
              }"
            />
          </div>
        </div>
        <el-icon @click="close"><CloseBold /></el-icon>
      </div>
    </template>
    <el-table
      :height="500"
      :data="tableTata"
      v-loading="tableLoading"
    >
      <el-table-column property="normcite" label="Normcite"/>
      <el-table-column property="effect" label="Effect" />
      <el-table-column property="effective_date" label="Effective date" />
      <el-table-column property="multi" label="Multi" />
      <el-table-column property="status" label="Status" />
      <el-table-column property="lmt" label="Last modified time" />
    </el-table>
    <template #footer>
      <el-button type="primary" @click="tableVisible = false">ok</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { getTableData } from "@/api";
import { Options, Vue } from "vue-class-component";
import TplParser from "@/components/TplParser/index.vue";
@Options<TaskDetail>({
  components: {
    "tpl-parser": TplParser
  }
})
export default class TaskDetail extends Vue {
  tableLoading = false;
  tableTata = [];
  tableVisible = false;
  detailTitle = "2020 Ind. SEA 148 >> Task Detail";
  async initData() {
    try {
      this.tableLoading = true;
      const res = await getTableData();
      if(res.data) {
        this.tableTata = res.data['deta_detail']
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.tableLoading = false
    }
  }
  showThis() {
    this.tableVisible = true;
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__header{
  border-bottom: 1px solid #E0E0E0;
  .my-header{
    justify-content: space-between;
  }
  .dialog-title-text{
    font-weight: 900;
    font-size: 16px;
  }
  .sing-box{
    margin-left: 20px;
  }
}

.el-dialog__footer{
  .el-button{
    min-width: 70px;
  }
}
</style>