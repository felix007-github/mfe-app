import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { MenuItem } from "prosemirror-menu";
import {
  MarkSpec,
  NodeSpec,
  NodeType,
  Node as ProseMirrorNode,
  Mark as ProseMirrorMark,
} from 'prosemirror-model';
import { SectionProcess } from "./section-process";
import { SPEC_TYPE } from "./enums";

export interface LegisTree {
  id: string;
  type: string | null;
  title: string | null;
  section?: SectionProcess;
  children: LegisTree[];
}

export interface MenuItem {
  dom: Element;
  command: (
    state: EditorState,
    dispatch: (tr: Transaction) => void,
    view?: EditorView
  ) => void;
}

export type INode = NodeSpec & {
  name: string;
  type: SPEC_TYPE;
  command?: (type: NodeType, view: EditorView) => any;
  keymap?: {
    [key in string]: (
      state: EditorState,
      dispatch?: ((tr: Transaction) => void) | undefined
    ) => boolean;
  };
};

export type IMark = MarkSpec & {
  name: string;
  type: SPEC_TYPE;
  command?: (type: NodeType, view: EditorView) => any;
  keymap?: {
    [key in string]: (
      state: EditorState,
      dispatch?: ((tr: Transaction) => void) | undefined
    ) => boolean;
  };
};

export type MarkRange = {
  mark: ProseMirrorMark;
  from: number;
  to: number;
};
