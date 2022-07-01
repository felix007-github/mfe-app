export class SectionProcess {
  xmlDoc!: Element;
  index = 0;
  heading: Element | null = null;
  xml: string;

  constructor(xml: string) {
    this.xml = xml;
    const div = document.createElement('pre');
    xml = this.processSelfClosingTag(xml);
    xml = this.clearEmptyBlank(xml);
    div.innerHTML = xml;
    this.xmlDoc = div;
  }

  plainXml(addId = false) {
    const array = this.recursionPlain(
      this.xmlDoc.childNodes as NodeListOf<Element>,
      0,
      addId
    );
    return array.join('');
  }

  serializer() {
    return this.xmlDoc.innerHTML.replace(/ cid=".*?"/gi, "");
  }

  rewrite(dom: Element) {
    console.log(this.xmlDoc);
    const cloneDom = document.createElement('div');
    const domString = this.removeExtraAttrs(dom.innerHTML);
    cloneDom.innerHTML = domString;
    let removedArray = [],
      insertedArray = [];
    for (const domNode of Array.from(cloneDom.childNodes) as Array<Element>) {
      const attrId = domNode.getAttribute('cid');
      if (attrId) {
        if (insertedArray.length > 0) {
          this.insert(insertedArray);
          insertedArray = [];
        }
      } else {
        insertedArray.push(domNode);
      }
    }

    if (insertedArray.length > 0) {
      this.insert(insertedArray);
    }

    for (let id = 0; id < this.index; id++) {
      const domNode = cloneDom.querySelector(`[cid="${id}"]`);
      if (!domNode) {
        removedArray.push(id);
      } else if (removedArray.length > 0) {
        this.remove(removedArray);
        removedArray = [];
      } else {
        this.matchNode(domNode, id);
      }
    }
    return this;
  }

  /**
   *
   * @param domNode
   * @param id
   */
  private matchNode(domNode: Element, id: string | number) {
    const xmlNode = this.getElementById(id);
    xmlNode;
    if (xmlNode) {
      if (
        xmlNode.nodeName === 'HEADING' ||
        xmlNode.nodeName === 'REF:CITATIONS' ||
        (xmlNode.nodeName === 'P' && xmlNode.querySelector('P') === null)
      ) {
        if (xmlNode.innerHTML !== this.getLevelNodeInnerHtml(domNode)) {
          this.update(xmlNode, domNode);
        }
      } else {
        // 匹配到的节点可能包含多条文本节点，则这个xml节点会包含多个id，根据id在id数组中的index找到text节点的位置，从而做更新
        const xmlAttrId = xmlNode?.getAttribute('cid');
        const arrayId = xmlAttrId?.split(',');
        const index = arrayId?.indexOf('' + id);
        if (index !== undefined) {
          const textNodes = this.filterTextNodes(xmlNode);
          const textNode = textNodes[index - 1] as Element;
          if (textNode.textContent !== domNode.textContent) {
            this.update(xmlNode, domNode);
          }
        } else throw new Error(`cid:${id}, 意外错误`);
      }
    } else throw new Error('DOM和XML节点匹配错误');
  }

  private filterTextNodes(node: Element) {
    return Array.from(node.childNodes).filter(
      (item) => item.nodeType === node.TEXT_NODE
    );
  }

  /**
   * 删除xml中被标记为删除的节点，如果被删除节点父节点没有包含文本，则也被删除，直到有父节点包含文本
   * @param removedArray
   */
  private remove(removedArray: any[]) {
    console.log('removedArray: ', removedArray);
    for (const id of removedArray) {
      const elem = this.getElementById(id);
      if (elem) {
        let parent = elem?.parentElement;
        elem?.remove();
        while (parent && parent.textContent === '') {
          const target = parent;
          parent = parent.parentElement;
          target.remove();
        }
      }
    }
  }

  /**
   * @param insertedArray
   */
  private insert(insertedArray: Element[], parent: Element | null = null) {
    console.log('insertedArray: ', insertedArray);
    const firstNode = insertedArray[0];
    const firstNodeLevel = firstNode.nodeName.substring(5);
    if (firstNode.firstChild?.nodeName === 'HEADING') {
      const lawtextcomponent = document.createElement(
        'statcode:lawTextComponent'
      );
      if (parent) {
        parent.appendChild(lawtextcomponent);
      } else {
        const prevXmlNode = this.getPrevXmlNodeBydomNode(firstNode);
        if (prevXmlNode) {
          prevXmlNode?.parentElement?.insertBefore(
            lawtextcomponent,
            prevXmlNode.nextSibling
          );
        } else {
          const next = this.getNextXmlNodeBydomNode(firstNode);
          next?.parentElement?.insertBefore(lawtextcomponent, next);
        }
      }
      lawtextcomponent.appendChild(firstNode.firstChild.cloneNode(true));
      const body = document.createElement('statcode:body');
      lawtextcomponent.appendChild(body);
      // domNode 中的html放入p节点中，并把p放入body节点中
      const p = document.createElement('p');
      body.appendChild(p);
      p.append(
        ...Array.from(firstNode.childNodes).filter(
          (item) => item !== firstNode.firstChild
        )
      );
      insertedArray.shift();
      if (insertedArray[0]) {
        // 只要不包含heading节点，就把level节点内容放入p节点，然后放入body中
        while (insertedArray[0].firstChild?.nodeName !== 'HEADING') {
          const p = document.createElement('p');
          body.appendChild(p);
          insertedArray.shift();
        }
        const level = insertedArray[0].nodeName.substring(5);
        if (level > firstNodeLevel)
          this.insert(insertedArray, lawtextcomponent);
        else this.insert(insertedArray);
      }
    } else {
      throw new Error('未实现比lawtextcomponent还要小的单元的插入');
    }
  }

  private getPrevXmlNodeBydomNode(domNode: Element) {
    let prev: Element | null = domNode.previousElementSibling;
    while (prev && prev.firstChild?.nodeName !== 'HEADING') {
      prev = prev.previousElementSibling;
    }
    const id = prev?.getAttribute('cid');
    const node = this.getElementById(id!);
    return this.getParentByName(node!, 'STATCODE:LAWTEXTCOMPONENT');
  }

  private getNextXmlNodeBydomNode(domNode: Element) {
    let next: Element | null = domNode.nextElementSibling;
    while (next && next.firstChild?.nodeName !== 'HEADING') {
      next = next.nextElementSibling;
    }
    const id = next?.getAttribute('cid');
    const node = this.getElementById(id!);
    return this.getParentByName(node!, 'STATCODE:LAWTEXTCOMPONENT');
  }

  private getParentByName(xmlNode: Element, name: string) {
    let parent = xmlNode.parentElement;
    while (parent && parent.nodeName === name) {
      parent = parent.parentElement;
    }
    return parent?.parentElement;
  }

  private getLevel(node: Element | null) {
    return node?.nodeName.substring(5);
  }

  private update(xmlNode: Element, domNode: Element) {
    console.log('xmlNode: ', xmlNode, 'domNode: ', domNode);
    xmlNode.innerHTML = this.getLevelNodeInnerHtml(domNode);
  }

  private recursionPlain(
    childNodes: NodeListOf<Element>,
    level = 0,
    addId = false
  ) {
    let array: any[] = [];
    for (const node of Array.from(childNodes)) {
      if (node.nodeName === 'HEADING') {
        level++;
        this.heading = node;
        // array.push(this.createLevelNode(node, 'heading', id, level, addId));
      } else if (node.nodeName === 'P' && node.querySelector('P') === null) {
        if (node.textContent !== null && node.textContent !== '') {
          array.push(
            this.createLevelNode(node, 'p', level, addId, this.heading)
          );
          this.heading = null;
        }
      } else if (node.nodeName === 'REF:CITATIONS') {
        if (node.textContent !== null && node.textContent !== '') {
          this.heading = null;
          array.push(this.createLevelNode(node, 'cite', level, addId));
        }
      } else if (node.nodeType === 3) {
        const elem = node.parentNode as Element;
        // 一个Node会存在多个textNode的情况
        const attrId = elem.getAttribute('cid') || ',';
        if (addId) elem.setAttribute('cid', attrId + String(this.index) + ',');
        array.push(
          this.createNode(
            `level${level}`,
            node.nodeValue,
            addId ? { cid: this.index, type: 'text' } : { type: 'text' }
          )
        );
        this.index++;
      } else {
        if (node.childNodes) {
          array = [
            ...array,
            ...this.recursionPlain(
              node.childNodes as NodeListOf<Element>,
              level,
              addId
            ),
          ];
        }
      }
    }
    return array;
  }

  private createLevelNode(
    node: Element,
    type: string,
    level: number,
    addId = false,
    heading: null | Element = null
  ) {
    let headingNode;
    if (heading) {
      addId && heading.setAttribute('cid', `,${this.index},`);
      headingNode = this.createNode(
        `heading`,
        heading.innerHTML,
        addId
          ? {
            cid: this.index,
            type,
          }
          : { type }
      );
      this.index++;
    }
    addId && node.setAttribute('cid', `,${this.index},`);
    const html = headingNode ? headingNode + node.innerHTML : node.innerHTML;
    const newNode = this.createNode(
      `level${level}`,
      html,
      addId
        ? {
          cid: this.index,
          type,
        }
        : { type }
    );
    this.index++;
    return newNode;
  }

  private createNode(tagName: string, text: string | null, attrs: any) {
    // const node = document.createElement(tagName);
    // node.textContent = text || ""
    // return node
    let attrsStr = '';
    for (const key in attrs) {
      attrsStr += ` ${key}="${attrs[key]}"`;
    }
    return `<${tagName}${attrsStr}>${this.decodeGtLt(text)}</${tagName}>`;
  }

  private decodeGtLt(str: string) {
    return str.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("title", 'ctitle');
  }

  private removeExtraAttrs(xml: string) {
    xml = xml.replace(/<textc>(.*?)<\/textc>/gi, '$1');
    xml = xml.replace(/data-tag="[^"]*"/gi, '');
    xml = xml.replace(/common=""/gi, '');
    xml = xml.replace(/class="[^"]*"/gi, '');
    return xml;
  }

  private getElementById(id: number | string) {
    return this.xmlDoc.querySelector(`[cid*=",${id},"]`);
  }

  private getLevelNodeInnerHtml(domNode: Element) {
    const str = [];
    for (const node of Array.from(domNode.childNodes) as Array<Element>) {
      if (node.nodeName !== 'HEADING')
        str.push(node.outerHTML || node.nodeValue);
    }
    return str.join('');
  }

  private processSelfClosingTag(xml: string) {
    xml = xml.replace(/<([a-z.:]*)([^/>]*?)\/>/gi, '<$1$2></$1>');
    return xml;
  }

  private clearEmptyBlank(text: string) {
    return text.replace(/ {2,}/gi, '');
  }
}
