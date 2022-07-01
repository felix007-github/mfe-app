<template>
  <div class="top-header is-flex col-center">
    <span class="title-text">Task Center</span>
    <div class="right-box is-flex col-center">
      <span class="label">Jurisdiction</span>
      <el-dropdown ref="jxDropdown" trigger="click">
        <div class="target-box is-flex col-center row-between">
          <span>{{ jxValue }}</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <div class="jx-template-box is-flex">
            <div v-for="(item, n) in jxDataList" :key="n" class="col-cell">
              <div 
                v-for="(t, i) in item"
                :key="i" 
                :class="{'disabled': t.disabled }"
                class="text-item is-flex"
                @click="choseItem(t.value, t.disabled)"
              >
                <el-icon v-if="jxValue === t.key"><Check /></el-icon>
                {{ t.key }}
              </div>
            </div>
          </div>
        </template>
      </el-dropdown>
      <span class="h-line"></span>
      <div class="user-msg">LL</div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import types from "@/store/types";
import { JXMAP } from "@/utils/keyMap";
import { Options, Vue } from "vue-class-component";
const { SET_JX_VALUE } = types.all(false);
@Options({
  computed: {
    jxValue() {
      const value = this.store.state.jx
      let name = ''
      if (value) {
        for (const key in JXMAP) {
          JXMAP[key].forEach((t)=>{
            if (value === t.value) {
              name = t.key
            }
          })
        }
      }
      return name
    }
  }
})
export default class TopHeader extends Vue {
  store = useStore();
  jxDataList = JXMAP;
  choseItem(t: string, disabled: boolean): void {
    if (disabled) return
    this.store.commit(SET_JX_VALUE, t)
    this.$refs.jxDropdown["handleClose"]()
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/TopHeaders.scss";
</style>