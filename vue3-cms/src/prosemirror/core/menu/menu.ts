import { EditorView } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';

class MenuView {
  items: any[];
  editorView: EditorView;
  dom: Element;
  updateFun: () => void;
  constructor(
    dom: Element,
    items: any[],
    editorView: EditorView,
    updateFun = () => {
      return;
    }
  ) {
    this.items = items;
    this.editorView = editorView;

    this.dom = dom;
    this.updateFun = updateFun;
    this.update();
  }

  update() {
    console.log(2222222222);
    this.updateFun();
    // const items = this.dom.querySelectorAll('.menu-item');
    // items.forEach((dom: Element) => {
    //   const active = command(this.editorView.state, null, this.editorView);
    //   if (active) dom.classList.add('is-active')
    // });
  }

  destroy() {
    this.dom.remove();
  }
}

export function menuPlugin(dom: Element, items: any[], update = () => { return; }) {
  return new Plugin({
    view(editorView: EditorView) {
      const menuView = new MenuView(dom, items, editorView, update);
      return menuView;
    },
  });
}
