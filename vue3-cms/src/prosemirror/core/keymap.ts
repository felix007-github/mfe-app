import { history, undo, redo } from "prosemirror-history";
import { baseKeymap as prosemirrorBaseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";

const histKeymap = keymap({ "Mod-z": undo, "Mod-y": redo });
export const baseKeymap = [
  histKeymap,
  keymap(prosemirrorBaseKeymap),
  history(),
];
