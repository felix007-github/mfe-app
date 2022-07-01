export function setNodeAttrs(node: any) {
  const nodeAttrs: any = {};
  for (const key in node.attrs.nodeAttrs) {
    nodeAttrs[key.replaceAll('___', ':')] = node.attrs.nodeAttrs[key];
  }
  if (node.attrs.localName)
    nodeAttrs.class = node.attrs.localName.split(':').join('-');
  return nodeAttrs;
}
