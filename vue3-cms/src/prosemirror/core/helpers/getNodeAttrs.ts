export function getNodeAttrs(dom: any) {
  const nodeAttrs: any = {};
  for (const attr of dom.attributes) {
    nodeAttrs[attr.nodeName] = attr.nodeValue;
  }
  nodeAttrs['data-tag'] = nodeAttrs.ns
    ? `${nodeAttrs.ns}:${dom.localName}`
    : dom.localName;
  return nodeAttrs;
}
