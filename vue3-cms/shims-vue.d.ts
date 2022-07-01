/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "prosemirror-menu" {
  export { menuBar };
  export {
    MenuItem,
    Dropdown,
    DropdownSubmenu,
    renderGrouped,
    icons,
    joinUpItem,
    liftItem,
    selectParentNodeItem,
    undoItem,
    redoItem,
    wrapItem,
    blockTypeItem,
  };
}

declare module "prosemirror-example-setup" {
  export { exampleSetup };
}

declare module 'diff' {
  export { diffWordsWithSpace };
}
