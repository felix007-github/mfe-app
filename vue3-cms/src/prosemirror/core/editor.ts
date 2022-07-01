import { keymap } from 'prosemirror-keymap';
import { Schema, DOMParser } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { nextTick, unref } from 'vue';
import { SPEC_TYPE } from './enums';
import { isActive } from './helpers/isActive';
import { isFunction } from './helpers/isFunction';
import { INode } from './Interface';
import { baseKeymap } from './keymap';
import { SectionProcess } from './section-process';

export function mountEditor(
  place: any,
  content: string,
  schema: Schema,
  editable = true,
  plugins: Plugin[],
  update: () => void = () => {
    return;
  }
) {
  const div = document.createElement('div');
  div.innerHTML = content;
  const doc = DOMParser.fromSchema(schema).parse(div);
  const view = new EditorView(place, {
    state: EditorState.create({
      doc,
      plugins: [...baseKeymap, ...plugins],
    }),
    editable() {
      return editable;
    },
    dispatchTransaction(transaction) {
      // console.log(
      //   'Document size went from',
      //   transaction.before.content.size,
      //   'to',
      //   transaction.doc.content.size
      // );

      const newState = view.state.apply(transaction);
      view.updateState(newState);
      nextTick(() => {
        // if (transaction.before.content.size !== transaction.doc.content.size) {
        //   const { $from, $to } = transaction.selection;
        //   // transaction.doc.nodesBetween(
        //   //   $from.pos,
        //   //   $to.pos,
        //   //   (node, pos, parent) => {
        //   //     if (node.type.name !== 'text') {
        //   //       node.attrs.nodeAttrs.id
        //   //     }
        //   //   }
        //   // );
        // }
        if (transaction.docChanged) update();
      });
    },
  });
  return view;
}

export class Editor {
  isMounted = false;
  private el = null;
  content: string | null = null;
  declare sectionProcess: SectionProcess;
  declare view: EditorView;
  declare schema: Schema;
  editable: boolean;
  commands: any = {};
  extentions: INode[];
  plugins: Plugin[] = [];
  onUpdate = () => {
    return;
  };

  get state() {
    return this.view && this.view.state;
  }

  constructor({
    editable,
    content = '',
    extentions = [],
  }: {
    editable: boolean;
    content?: string;
    extentions: INode[];
  }) {
    this.editable = editable;
    this.content = content || null;
    this.extentions = extentions;
    // watchEffect(() => {
    //   this.mounted();
    // });
  }

  setContent(content: string) {
    this.content = content;
    this.mounted();
  }

  setElement(el: Element) {
    this.el = el;
    this.mounted();
  }

  serializer() {
    if (this.view.dom)
      return this.sectionProcess.rewrite(this.view?.dom).serializer();
  }

  isActive(name: string, attributes?: any): boolean {
    console.log(1111111111);
    if (!this.state) return false;
    return isActive(this.view.state, name, attributes);
  }

  registerPlugin(
    plugin: Plugin,
    handlePlugins?: (newPlugin: Plugin, plugins: Plugin[]) => Plugin[]
  ): void {
    if (this.isMounted) {
      const plugins =
        handlePlugins && isFunction(handlePlugins)
          ? handlePlugins(plugin, this.view.state.plugins as Plugin[])
          : [...this.view.state.plugins, plugin];
      const state = this.view.state.reconfigure({ plugins });
      this.view.updateState(state);
    } else {
      this.plugins.push(plugin);
    }
  }

  unregisterPlugin(name: string): void {
    const state = this.view.state.reconfigure({
      plugins: this.view.state.plugins.filter(
        (plugin: any) => !plugin.key.startsWith(name)
      ),
    });

    this.view.updateState(state);
  }

  destroy(): void {
    if (this.view) this.view.destroy();
  }

  private mounted() {
    if (this.content && this.el) {
      this.sectionProcess = new SectionProcess(this.content);
      this.schema = this.buildSchema(this.extentions);
      // const menuItems = this.buildMenuItems(this.extentions, this.schema);
      const keymaps = this.buildKeyMaps(this.extentions);
      this.plugins.push(...keymaps);
      this.view = mountEditor(
        { mount: this.el },
        this.sectionProcess.plainXml(this.editable),
        this.schema,
        this.editable,
        this.plugins,
        () => {
          this.onUpdate();
        }
      );
      this.isMounted = true;
      this.commands = this.buildCommands(this.extentions);
    }
  }

  private buildSchema(extentions: INode[]) {
    const schemaSpec: any = { nodes: {}, marks: {} };
    for (const extention of extentions) {
      if (extention.type === SPEC_TYPE.NODE)
        schemaSpec.nodes[extention.name] = unref(extention);
      else schemaSpec.marks[extention.name] = unref(extention);
    }
    return new Schema(schemaSpec);
  }

  // private buildMenuItems(extentions: INode[], schema: Schema) {
  //   const menuItems: MenuItem[] = [];
  //   for (const extention of extentions) {
  //     const type = schema.nodes[extention.name];
  //     if (extention.command) {
  //       const command = extention.command(type);
  //       this.commands[extention.name] = command;
  //       menuItems.push({dom: })
  //     };
  //   }
  // }

  private buildCommands(extentions: INode[]) {
    const commands: any = {};
    for (const extention of extentions) {
      const type = this.schema.nodes[extention.name];
      if (extention.command) {
        const command = extention.command(type, this.view);
        commands[extention.name] = command;
      }
    }
    return commands;
  }

  private buildKeyMaps(extentions: INode[]) {
    const keymaps = [];
    for (const extention of extentions) {
      if (extention.keymap) keymaps.push(keymap(extention.keymap));
    }
    return keymaps;
  }
}
