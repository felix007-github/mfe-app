import { EditorState, Transaction } from 'prosemirror-state';
export const upLevel = (
  state: EditorState,
  dispatch?: ((tr: Transaction) => void) | undefined
): boolean => {
  if (dispatch) {
    const attrs = state.selection.$from.parent.attrs;
    const newAttrs: any = {};
    newAttrs.nodeAttrs = {
      cid: attrs.nodeAttrs.cid,
      type: attrs.nodeAttrs.type,
      update: true,
    };
    newAttrs.level = attrs.level - 1;
    dispatch(
      state.tr
        .setNodeMarkup(state.selection.$from.before(1), undefined, newAttrs)
        .scrollIntoView()
    );
  }
  return true;
};
export const downLevel = (
  state: EditorState,
  dispatch?: ((tr: Transaction) => void) | undefined
): boolean => {
  if (dispatch) {
    const attrs = state.selection.$from.parent.attrs;
    const newAttrs: any = {};
    newAttrs.nodeAttrs = {
      cid: attrs.nodeAttrs.cid,
      type: attrs.nodeAttrs.type,
      update: true,
    };
    newAttrs.level = attrs.level + 1;
    dispatch(
      state.tr
        .setNodeMarkup(state.selection.$from.before(1), undefined, newAttrs)
        .scrollIntoView()
    );
  }
  return true;
};
