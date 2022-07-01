<template>
  <div class="legislation-editor-wraper">
    <editor-content :editor="editor"></editor-content>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Editor } from "@/prosemirror/core/editor";
import { Level, Doc, Text, Image } from "@/prosemirror/core/nodes";
import { Common, Inserted, Removed } from "@/prosemirror/core/marks";
import { EditorView } from 'prosemirror-view';
import EditorContent from '@/prosemirror/EditorContent.vue';

@Options<LegislationEditor>({
  components: {
    'editor-content': EditorContent,
  },
  props: {
    content: String,
    editable: Boolean,
  },
})
export default class LegislationEditor extends Vue {
  view: EditorView | undefined = undefined;
  xml = '';
  declare content: string;
  declare editable: boolean;
  declare editor: Editor;
  created() {
    this.editor = new Editor({
    editable: this.editable,
    content: this.content,
    extentions: [
      new Doc(),
      new Text(),
      new Level(),
      new Image(),
      new Common(),
      new Inserted(),
      new Removed(),
    ],
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .legislation-editor-wraper {
//   width: 50%;
// }
.ProseMirror-menubar {
  display: flex;
  border-radius: 6px;
  height: 30px;
  .menuicon {
    padding: 10px;
    &:hover {
      background-color: rgba($color: #409eff, $alpha: 0.7);
      cursor: pointer;
    }
  }
}
removed {
  background-color: red;
}
inserted {
  background-color: green;
}
heading {
  background-color: yellow;
  margin-right: 5px;
}
level0,
level1,
level2,
level3,
level4,
level5,
level6,
level7,
level8 {
  display: block;
}

level1 {
  margin-left: 20px;
}
level2 {
  margin-left: 40px;
}
level3 {
  margin-left: 60px;
}
level4 {
  margin-left: 80px;
}
level5 {
  margin-left: 100px;
}
level6 {
  margin-left: 120px;
}
level7 {
  margin-left: 140px;
}
level8 {
  margin-left: 160px;
}

[type='text'] {
  font-size: 16px;
}

[type='heading'] {
  font-size: 18px;
}

[type='footnote'] {
  label {
    &::after {
      content: ' - ';
    }
  }
}

[value*='PART'] {
  font-size: 22px;
}

[value*='PART'] + title {
  font-size: 22px;
  &::before {
    content: ' - ';
  }
}

title {
  display: inline;
}

changedText[action='deleted'] {
  background-color: red;
}

changedText[action='added'] {
  background-color: greenyellow;
}

.legislation-editor {
  text-align: left;
  &.show-tag {
    * {
      &:not(textc):before {
        content: '<' attr(data-tag) '>';
        font-weight: 700;
        color: red;
      }
      &:not(textc)::after {
        content: '</' attr(data-tag) '>';
        font-weight: 700;
        color: red;
      }
    }
  }
  * {
    box-sizing: border-box;
  }
}
</style>
