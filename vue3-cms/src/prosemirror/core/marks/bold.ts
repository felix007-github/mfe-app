import { IMark } from '../Interface';
import { SPEC_TYPE } from '../enums';
import { NodeType } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { bold } from '../commands/bold';

export class Bold implements IMark {
  name = 'bold';
  type = SPEC_TYPE.MARK;
  attrs = {
    type: {
      default: 'bold',
    },
  };
  toDOM(node: any): any {
    return ['em', { type: node.attrs.type }, 0];
  }
  parseDOM = [
    {
      tag: 'em[type="bold"]',
    },
  ];
  inclusive = false;
  command(type: NodeType, view: EditorView) {
    return () => {
      return bold(view.state, view.dispatch);
    };
  }
}
