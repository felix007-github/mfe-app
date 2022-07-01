class Extractor {
  xml: string;
  doc: Document;

  constructor() {
    // todo
    this.xml = null;
    this.doc = null;
  }

  init(xml: string): void {
    xml = this._removeNs(xml);
    const domParser: DOMParser = new DOMParser();
    this.xml = xml;
    this.doc = domParser.parseFromString(xml, "text/xml");
  }

  _removeNs(xml: string): string {
    const ns_reg = `<?xml version="1.0" encoding="us-ascii"?>`;
    const content = xml.replace(ns_reg, "");
    return content;
  }

  _getElement(node: string, root = this.doc): Array<object> {
    const eles: Array<object> = Array.from(root.getElementsByTagName(node));
    return eles;
  }
}

class CaseActExtractor extends Extractor {
  constructor() {
    super();
  }

  init(xml: string): void {
    xml = this._removeNs(xml);
    const domParser: DOMParser = new DOMParser();
    this.xml = xml;
    this.doc = domParser.parseFromString(xml, "text/xml");
  }

  _removeNs(xml: string): string {
    const ns_reg = `<?xml version="1.0" encoding="UTF-8"?>`;
    const content = xml.replace(ns_reg, "");
    return content;
  }

  getSections(root = this.doc): Array<object> {
    const items: Array<object> = this._getElement("legis:section", root);
    return items;
  }

  getCites(root = this.doc): Array<object> {
    const items: Array<object> = this._getElement("ref:citeForThisResource", root);
    return items;
  }

  getStatusEnacted(root = this.doc): string {
    const items: Array<object> = this._getElement("legis:statusHistory", root);
    if (items.length === 1) {
      const statusHistorys: Array<object> = this._getElement("legis:status", <Document>items[0]);
      if (statusHistorys.length > 0) {
        const statusForEnacted: string = this._getElement("legis:actionDate", <Document>statusHistorys[0])[0]["textContent"].trim();
        return statusForEnacted;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getCiteBill(root = this.doc): string {
    const items: Array<object> = this._getElement("legis:information", root);
    if (items.length > 0) {
      const cites: Array<object> = this._getElement("lnci:cite", <Document>items[0]);
      const citeBill: object = cites.find((i) => i["attributes"].type.nodeValue === "bill");
      return citeBill["textContent"].trim();
    } else {
      return "";
    }
  }
}
class GetTargatXml extends Extractor {
  section: string;
  contentXml: Array<object>;
  constructor() {
    super();
  }

  init(xml: string): void {
    const domParser: DOMParser = new DOMParser();
    this.xml = xml;
    this.doc = domParser.parseFromString(xml, "text/xml");
    this.contentXml = this.getContent();
  }

 
  getContent(root = this.doc): Array<object> {
    const items: Array<object> = this._getElement("statcode:sectionContent", root);
    return items;
  }

  getSections(root = this.contentXml): Element {
    const tag = document.createElement('div')
    if (root.length > 0) {
      const cites: Array<object> = this._getElement("statcode:lawTextComponent", <Document>root[0]);
      cites.map((item:Element )=>{
        tag.appendChild(item)
      })
    }
    return tag;
  }
  getIntroduce(root = this.contentXml): string {
    if (root.length > 0) {
      const statusHistorys: Array<object> = this._getElement("title", <Document>root[0]);
      return statusHistorys[0]["textContent"].trim();
    } else {
      return "";
    }
  }

  getTitle(root = this.contentXml): string {
    if (root.length > 0) {
      const cites: Array<object> = this._getElement("designator", <Document>root[0]);
      return cites[0]["textContent"].trim();
    } else {
      return "";
    }
  }
}

export const caseActExtractor = new CaseActExtractor();
export const targatXmlDarw = new GetTargatXml();
