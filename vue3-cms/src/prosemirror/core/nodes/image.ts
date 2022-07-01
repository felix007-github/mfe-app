import { INode } from '../Interface';
import { SPEC_TYPE } from '../enums';

export class Image implements INode {
  name = 'image';
  type = SPEC_TYPE.NODE;
  content = 'block+';
  inline = true;
  attrs = {
    src: {},
    alt: { default: null },
    title: { default: null },
  };
  group = 'inline';
  draggable = true;
  parseDOM = [
    {
      tag: 'img[src]',
      getAttrs(dom: any) {
        return {
          src: dom.getAttribute('src'),
          title: dom.getAttribute('title'),
          alt: dom.getAttribute('alt'),
        };
      },
    },
  ];
  toDOM(node: any): any {
    return ['img', node.attrs];
  }
}
