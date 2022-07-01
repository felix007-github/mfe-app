import { EditorState, Transaction } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';

export const bold = (
  state: EditorState,
  dispatch?: ((tr: Transaction) => void) | undefined
): boolean => {
  const nodeType = state.schema.marks.bold;
  return toggleMark(nodeType, {})(state, dispatch);
};
