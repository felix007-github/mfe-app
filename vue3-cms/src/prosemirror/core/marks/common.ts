import { IMark } from '../Interface';
import { SPEC_TYPE } from '../enums';
import { getNodeAttrs } from '../helpers/getNodeAttrs';
import { setNodeAttrs } from '../helpers/setNodeAttrs';

export class Common implements IMark {
  name = 'common';
  type = SPEC_TYPE.MARK;
  excludes = '';
  attrs = {
    localName: { default: 'common' },
    nodeAttrs: {},
  };
  parseDOM = [
    {
      tag: '*',
      priority: 30,
      preserveWhitespace: true,
      getAttrs(dom: any) {
        const attrs: any = { nodeAttrs: getNodeAttrs(dom) };
        attrs.nodeAttrs.common = '';
        attrs.localName = dom.localName;
        return attrs;
      },
    },
  ];
  toDOM(node: any): any {
    const ns = node.attrs.nodeAttrs.ns;
    const tagName = ns ? `${ns}:${node.attrs.localName}` : node.attrs.localName;
    return [tagName, setNodeAttrs(node), 0];
  }
}
