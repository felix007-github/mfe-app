<script lang="ts">
import { h } from "vue";
import { ElProgress } from "element-plus";
import { Vue, Options } from "vue-class-component";
@Options<TplParser>({
  props: {
    tplType: String,
    itemData: Object
  }
})
export default class TplParser extends Vue {
  declare itemData: object;
  declare tplType: string;
  render() {
    const tplType = this.tplType;
    const str = this.itemData[tplType];
    switch (tplType) {
      case "hb_sb":
      case "session":
        return h(
          "span",
          { class: "cell-bold-text" },
          [str]
        )
      case "status":
        return h(
          "div",
          { class: str === "new" ? "row-new-box" : str === "inprogress" ? "row-inprogress-box" : null },
          [str]
        )
      case "priority":
        return h(
          "div",
          { class: "priority-box is-flex col-center" },
          [
            h("svg", { class: "iconpark-icon ischeck", fill: "currentColor"}, [h("use", { href: "#lightning" })]),
            h("svg", { class: "iconpark-icon", fill: "currentColor"}, [h("use", { href: "#lightning" })]),
            h("svg", { class: "iconpark-icon", fill: "currentColor"}, [h("use", { href: "#lightning" })]),
          ]
        )
      case "actions":
        return h(
          "div",
          { class: "action-box is-flex col-center" },
          [
            h(ElProgress, {
              type: "circle",
              width: 20,
              color: "#43A047",
              strokeWidth: 3,
              showText: false, 
              percentage: (str / this.itemData["action_total"]) * 100
            }),
            `${str}/${this.itemData["action_total"]}`
          ]
        )
      case "created_at":
        return h(
          "div",
          { class: "created-at-box is-flex col-center" },
          [
            this.getContent(str, 0),
            h("br"),
            this.getContent(str, 1) + this.getContent(str, 2)
          ]
        )
      case "last_motified":
        return h(
          "div",
          { class: "last-motified-box is-flex col-center" },
          [
            h("div", { class: "lm-top-show col-center" }, [
              h("svg", { class: "iconpark-icon", fill: "currentColor", onClick: this.viewDetail }, [h("use", { href: "#view" })]),
              h("svg", { class: "iconpark-icon", fill: "currentColor", onClick: this.toLinkAuPage }, [h("use", { href: "#edit" })]),
            ]),
            h("div", { class: "bottom-str is-flex col-center" }, [
              h("div", { class: "use-name is-flex col-center row-center" }, ["LL"]),
              h("div", { class: "text-time" }, [
                this.getContent(str, 0),
                h("br"),
                this.getContent(str, 1) + this.getContent(str, 2)
              ]),
            ])
          ]
        )
      default:
        return h(
          "span",
          { class: "my-text" },
          [`--`]
        );
    }
  }
  getContent(text, num) {
    if(text) {
      return text.split(/[\s\n]/)[num]
    } else {
      return ""
    }
  }
  viewDetail() {
    this.$emit("viewDetail")
  }
  toLinkAuPage() {
    this.$router.push({
      name: "auVerification"
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/index.scss";
</style>