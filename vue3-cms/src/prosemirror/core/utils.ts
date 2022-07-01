/* eslint-disable @typescript-eslint/no-explicit-any */
import { toggleMark, setBlockType } from 'prosemirror-commands';
import { MenuItem } from 'prosemirror-menu';
import { MarkType, NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

export function markActive(state: EditorState, type: MarkType) {
  const { from, $from, to, empty } = state.selection;
  if (empty) return type.isInSet(state.storedMarks || $from.marks());
  else return state.doc.rangeHasMark(from, to, type);
}

export function markItem(markType: MarkType, options: any, attrs?: any) {
  const passedOptions: any = {
    active(state: any) {
      return markActive(state, markType);
    },
    enable: true,
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  return cmdItem(toggleMark(markType, attrs), passedOptions);
}

function cmdItem(cmd: any, options: any) {
  const passedOptions: any = {
    label: options.title,
    run: cmd,
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  if ((!options.enable || options.enable === true) && !options.select)
    passedOptions[options.enable ? 'enable' : 'select'] = (state: any) =>
      cmd(state);

  return new MenuItem(passedOptions);
}

export function icon(text: string, name: string) {
  const span = document.createElement('span');
  span.className = 'menuicon ' + name;
  span.title = name;
  span.textContent = text;
  return span;
}

// :: (NodeType, Object) → MenuItem
// Build a menu item for changing the type of the textblock around the
// selection to the given type. Provides `run`, `active`, and `select`
// properties. Others must be given in `options`. `options.attrs` may
// be an object to provide the attributes for the textblock node.
export function blockTypeItem(
  nodeType: NodeType,
  options: {
    [x: string]: any;
    attrs:
      | {
          [key: string]: any;
        }
      | undefined;
  }
) {
  const command = setBlockType(nodeType, options.attrs);
  const passedOptions: any = {
    run: command,
    enable(state: any) {
      return command(state);
    },
    active(state: { selection: { $from: any; to: any; node: any } }) {
      const { $from, to, node } = state.selection;
      if (node) return node.hasMarkup(nodeType, options.attrs);
      return (
        to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs)
      );
    },
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}
