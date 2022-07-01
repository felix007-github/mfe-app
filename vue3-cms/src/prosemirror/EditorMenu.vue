<template>
  <div class="editor-menu" @mousedown.prevent="">
    <slot v-if="show"></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { Options, Vue } from "vue-class-component";
import { Editor } from "./core/editor";
import { menuPlugin } from "./core/menu/menu";

@Options<EditorMenu>({
  props: {
    editor: Editor,
  },
})
export default class EditorMenu extends Vue {
  declare editor: Editor;
  show = false;
  mounted() {
    this.$nextTick(() => {
      const plugin = menuPlugin(ref(this.$el), [], () => {
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
      });
      this.editor.registerPlugin(plugin);
    })
  }

  empty() {
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
