// import { LegisTree } from './Interface';
// import { SectionProcess } from './section-process';

// class LegislationProcess {
//   private xml!: string;
//   private xmlDoc!: HTMLPreElement;

//   init(xml: string) {
//     this.xml = xml;
//     const div = document.createElement('pre');
//     xml = this.processSelfClosingTag(xml);
//     xml = this.clearEmptyBlank(xml);
//     div.innerHTML = xml;
//     this.xmlDoc = div;
//     return this;
//   }

//   getTree() {
//     console.log(this.xmlDoc);
//     const trees: LegisTree[] = [];
//     const hierarchys = this.xmlDoc.childNodes[0].childNodes[0].childNodes;
//     this.recursionAnalysis(Array.from(hierarchys) as Array<Element>, trees);
//     return trees;
//   }

//   private recursionAnalysis(hierarchys: Element[], trees: LegisTree[]) {
//     for (const hierarchy of hierarchys) {
//       const tree = {} as LegisTree;
//       tree.id = this.guid();
//       if (hierarchy.nodeName == 'LEGIS:HIERARCHY') {
//         trees.push(tree);
//         tree.type = hierarchy.getAttribute('type');
//         tree.children = [];
//         if (['article'].includes(tree.type as string)) {
//           tree.title = hierarchy.childNodes[0].textContent;
//           const array = Array.from(hierarchy.childNodes[1].childNodes).slice(1);
//           this.recursionAnalysis(array as Array<Element>, tree.children);
//         } else if (
//           ['schedule', 'part', 'unclassified'].includes(tree.type as string)
//         ) {
//           const heading = hierarchy.childNodes[0].childNodes[0];
//           tree.title = `${heading.childNodes[0].textContent} ${heading.childNodes[1]?.textContent}`;
//           const secondNode = hierarchy.childNodes[0].childNodes[1];
//           if (
//             ['LEGIS:SECTION', 'LEGIS:HIERARCHY'].includes(secondNode.nodeName)
//           ) {
//             const array = Array.from(hierarchy.childNodes[0].childNodes).slice(
//               1
//             );
//             this.recursionAnalysis(array as Array<Element>, tree.children);
//           } else if (['LEGIS:LAWTEXTCOMPONENT'].includes(secondNode.nodeName)) {
//             tree.section = new SectionProcess(hierarchy);
//           }
//         }
//       } else if (hierarchy.nodeName == 'LEGIS:SECTION') {
//         trees.push(tree);
//         tree.type = 'section';
//         const shorttitle = hierarchy.getElementsByTagName('ref:citations');
//         tree.title = shorttitle[0].textContent;
//         tree.section = new SectionProcess(hierarchy);
//       }
//     }
//   }

//   private processPTag2Para(xml: string) {
//     xml = xml.replace(/<p>/gi, '<para>');
//     xml = xml.replace(/<\/p>/gi, '</para>');
//     return xml;
//   }

//   private processParaTag2P(xml: string) {
//     xml = xml.replace(/<para>/gi, '<p>');
//     xml = xml.replace(/<\/para>/gi, '</p>');
//     return xml;
//   }

//   private replaceNamespace(xml: string) {
//     xml = xml.replace(/<([a-z.^:]+):([a-z.]*)/gi, '<$2 ns="$1" ');
//     xml = xml.replace(/<\/([a-z.^:]+):/gi, '</');
//     xml = xml.replace(/ ([a-z.^:]+):([a-z.]*)/gi, '$1___$2');
//     // console.log(xml)
//     return xml;
//   }

//   private clearEmptyBlank(text: string) {
//     return text.replace(/ {2,}/gi, '');
//   }

//   private processSelfClosingTag(xml: string) {
//     xml = xml.replace(/<([a-z.:]*)([^/>]*?)\/>/gi, '<$1$2></$1>');
//     return xml;
//   }

//   private guid() {
//     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//   }
// }

// export const legislationProcess = new LegislationProcess();
