// import { Schema } from "prosemirror-model";
// import { getNodeAttrs, setNodeAttrs } from "./utils";

// export const legislationSchema = new Schema({
//   nodes: {
//     doc: {
//       content: 'block+',
//     },
//     text: {
//       group: 'inline',
//     },
//     level: {
//       attrs: { level: { default: 0 }, nodeAttrs: { default: {} } },
//       content: 'text*',
//       group: 'block',
//       defining: true,
//       parseDOM: [
//         {
//           tag: 'level0',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 0, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level1',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 1, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level2',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 2, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level3',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 3, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level4',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 4, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level5',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 5, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level6',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 6, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level7',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 7, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//         {
//           tag: 'level8',
//           preserveWhitespace: true,
//           getAttrs(dom) {
//             return { level: 8, nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//       ],
//       toDOM(node) {
//         return ['level' + node.attrs.level, setNodeAttrs(node), 0];
//       },
//     },
//     // common: {
//     //   group: 'block',
//     //   content: 'text*',
//     //   attrs: {
//     //     localName: { default: 'common' },
//     //     nodeAttrs: {},
//     //   },
//     //   toDOM(node: any) {
//     //     const ns = node.attrs.nodeAttrs.ns;
//     //     const tagName = ns
//     //       ? `${ns}:${node.attrs.localName}`
//     //       : node.attrs.localName;
//     //     return [tagName, setNodeAttrs(node), 0];
//     //   },
//     //   parseDOM: [
//     //     {
//     //       tag: '*',
//     //       priority: 50,
//     //       preserveWhitespace: true,
//     //       getAttrs(dom: any) {
//     //         const attrs: any = { nodeAttrs: getNodeAttrs(dom) };
//     //         attrs.nodeAttrs.common = '';
//     //         attrs.localName = dom.localName;
//     //         return attrs;
//     //       },
//     //     },
//     //   ],
//     // },
//     image: {
//       inline: true,
//       attrs: {
//         src: {},
//         alt: { default: null },
//         title: { default: null },
//       },
//       group: 'inline',
//       draggable: true,
//       parseDOM: [
//         {
//           tag: 'img[src]',
//           getAttrs(dom: any) {
//             return {
//               src: dom.getAttribute('src'),
//               title: dom.getAttribute('title'),
//               alt: dom.getAttribute('alt'),
//             };
//           },
//         },
//       ],
//       toDOM(node) {
//         return ['img', node.attrs];
//       },
//     },
//   },
//   marks: {
//     common: {
//       excludes: '',
//       attrs: {
//         localName: { default: 'common' },
//         nodeAttrs: {},
//       },
//       toDOM(node: any) {
//         const ns = node.attrs.nodeAttrs.ns;
//         const tagName = ns
//           ? `${ns}:${node.attrs.localName}`
//           : node.attrs.localName;
//         return [tagName, setNodeAttrs(node), 0];
//       },
//       parseDOM: [
//         {
//           tag: '*',
//           priority: 30,
//           preserveWhitespace: true,
//           getAttrs(dom: any) {
//             const attrs: any = { nodeAttrs: getNodeAttrs(dom) };
//             attrs.nodeAttrs.common = '';
//             attrs.localName = dom.localName;
//             return attrs;
//           },
//         },
//       ],
//     },
//     removed: {
//       attrs: {
//         nodeAttrs: { default: null },
//       },
//       toDOM(node) {
//         return ['removed', setNodeAttrs(node), 0];
//       },
//       parseDOM: [
//         {
//           tag: 'removed',
//           getAttrs(dom) {
//             return { nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//       ],
//       inclusive: false,
//     },
//     inserted: {
//       attrs: {
//         nodeAttrs: { default: null },
//       },
//       toDOM(node) {
//         return ['inserted', setNodeAttrs(node), 0];
//       },
//       parseDOM: [
//         {
//           tag: 'inserted',
//           getAttrs(dom) {
//             return { nodeAttrs: getNodeAttrs(dom) };
//           },
//         },
//       ],
//       inclusive: false,
//     },
//   },
// });
