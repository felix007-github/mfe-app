<template>
  <div class="legislation-tree">
    <el-drawer 
      v-model="editDrawerVisible" 
      title="I am the title"
      :direction="direction">
      <el-input v-model="filterText" placeholder="Filter keyword" />
      <el-tree ref="treeRef" class="filter-tree" :data="editTree" :props="defaultProps" default-expand-all
        :filter-node-method="filterNode" @node-click="nodeClick" />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import type { ElTree } from 'element-plus'
import { Options, Vue } from 'vue-class-component';
// import { BuildPropType } from 'element-plus/es/utils/vue/props';
import { LegisTree } from '@/prosemirror/core/Interface';
@Options({
  components: {
  },
  props: {
    editTree: {
      type: Array
    }
  }
})
export default class LegislationTree extends Vue {
  editDrawerVisible = false;
  direction: "rtl" | "ltr" | "ttb" | "btt";
  filterText = ''
  defaultProps = {
    children: 'children',
    label: 'title',
  }
  declare editTree: LegisTree[];
  declare treeRef: InstanceType<typeof ElTree>;

  mounted() {
    console.log(this.editTree)
  }

  filterNode(value: string, data: any) {
    if (!value) return true
    return data.label.includes(value)
  }

  input($event: any) {
    this.$emit('change', $event?.target?.value);
  }

  nodeClick(data: any) {
    if (data.section) this.$emit('select', data);
  }
}
</script>
