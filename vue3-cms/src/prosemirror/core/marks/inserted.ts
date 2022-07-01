import { IMark } from '../Interface';
import { SPEC_TYPE } from '../enums';
import { getNodeAttrs } from '../helpers/getNodeAttrs';
import { setNodeAttrs } from '../helpers/setNodeAttrs';

export class Inserted implements IMark {
  name = 'inserted';
  type = SPEC_TYPE.MARK;
  attrs = {
    nodeAttrs: { default: null },
  };
  toDOM(node: any): any {
    return ['inserted', setNodeAttrs(node), 0];
  }
  parseDOM = [
    {
      tag: 'inserted',
      getAttrs(dom: any) {
        return { nodeAttrs: getNodeAttrs(dom) };
      },
    },
  ];
  inclusive = false;
}
