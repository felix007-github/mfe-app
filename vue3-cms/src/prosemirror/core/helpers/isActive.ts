import { EditorState, NodeSelection } from 'prosemirror-state';

export function isActive(
  state: EditorState,
  name: string,
  attributes: Record<string, any> = {}
): boolean {
  const nodeType = state.schema.nodes[name];
  if (nodeType) {
    const { $from, to, node } = state.selection as NodeSelection;
    if (node) return node.hasMarkup(nodeType, attributes);
    return to <= $from.end() && $from.parent.hasMarkup(nodeType, attributes);
  } else {
    const markType = state.schema.marks[name];
    const { $from, from, to, empty } = state.selection;
    console.log($from.parent.rangeHasMark(from, to, markType));
    return empty
      ? !!markType.isInSet(state.storedMarks || $from.marks())
      : state.doc.rangeHasMark(from, to, markType);
  }
}
