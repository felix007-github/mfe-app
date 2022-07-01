import { IMark } from '../Interface';
import { SPEC_TYPE } from '../enums';
import { getNodeAttrs } from '../helpers/getNodeAttrs';
import { setNodeAttrs } from '../helpers/setNodeAttrs';

export class Removed implements IMark {
  name = 'removed';
  type = SPEC_TYPE.MARK;
  attrs = {
    nodeAttrs: { default: null },
  };
  toDOM(node: any): any {
    return ['removed', setNodeAttrs(node), 0];
  }
  parseDOM = [
    {
      tag: 'removed',
      getAttrs(dom: any) {
        return { nodeAttrs: getNodeAttrs(dom) };
      },
    },
  ];
  inclusive = false;
}
