<template>
  <div class="editor-content-wraper">
    <!-- <span>是否显示标签：</span>
    <input type="radio" v-model="showTag" name="showTag" value="1" />
    <span for="showTag">是</span>
    <input type="radio" v-model="showTag" name="hideTag" value="0" />
    <span for="hideTag">否</span> -->
    <div class="editor-wrap">
      <div
        class="editor-content"
        :class="{ 'show-tag': showTag === '1' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Editor } from "./core/editor";

@Options<EditorContent>({
  props: {
    editor: Editor,
  },
})
export default class EditorContent extends Vue {
  xml = "";
  showTag = "0";
  declare editor: Editor;
  mounted() {
    this.editor.setElement(this.$el.querySelector(".editor-content"));
  }
}
</script>
