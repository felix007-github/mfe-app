import { EditorView } from "prosemirror-view";
import { Transaction } from "prosemirror-state";
import { NodeType } from "prosemirror-model";
import { INode } from "../Interface";
import { SPEC_TYPE } from "../enums";
import { getNodeAttrs } from "../helpers/getNodeAttrs";
import { setNodeAttrs } from "../helpers/setNodeAttrs";
import { upLevel, downLevel } from "../commands/level";

export class Level implements INode {
  name = "level";
  type = SPEC_TYPE.NODE;
  attrs = { level: { default: 0 }, nodeAttrs: { default: {} } };
  content = "text*";
  group = "block";
  defining = true;
  parseDOM = [
    {
      tag: "level0",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 0, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level1",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 1, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level2",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 2, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level3",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 3, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level4",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 4, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level5",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 5, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level6",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 6, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level7",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 7, nodeAttrs: getNodeAttrs(dom) };
      },
    },
    {
      tag: "level8",
      preserveWhitespace: true,
      getAttrs(dom: any) {
        return { level: 8, nodeAttrs: getNodeAttrs(dom) };
      },
    },
  ];
  toDOM(node: any): any {
    return ["level" + node.attrs.level, setNodeAttrs(node), 0];
  }
  command(type: NodeType, view: EditorView) {
    return (number: 1 | -1) => {
      return number === -1
        ? upLevel(view.state, view.dispatch)
        : downLevel(view.state, view.dispatch);
    };
  }

  keymap = {
    "Shift-q": upLevel,
    "Shift-e": downLevel,
  };
}
