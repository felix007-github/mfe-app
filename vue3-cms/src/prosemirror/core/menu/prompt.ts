const prefix = "ProseMirror-prompt";

export function openPrompt(options: any) {
  let wrapper = document.body.appendChild(document.createElement("div"));
  wrapper.className = prefix;

  let mouseOutside = (e: any) => {
    if (!wrapper.contains(e.target)) close();
  };
  setTimeout(() => window.addEventListener("mousedown", mouseOutside), 50);
  let close = () => {
    window.removeEventListener("mousedown", mouseOutside);
    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
  };

  let domFields: any[] = [];
  for (let name in options.fields)
    domFields.push(options.fields[name].render());

  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = prefix + "-submit";
  submitButton.textContent = "OK";
  let cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = prefix + "-cancel";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", close);

  let form = wrapper.appendChild(document.createElement("form"));
  if (options.title)
    form.appendChild(document.createElement("h5")).textContent = options.title;
  domFields.forEach((field) => {
    form.appendChild(document.createElement("div")).appendChild(field);
  });
  let buttons = form.appendChild(document.createElement("div"));
  buttons.className = prefix + "-buttons";
  buttons.appendChild(submitButton);
  buttons.appendChild(document.createTextNode(" "));
  buttons.appendChild(cancelButton);

  let box = wrapper.getBoundingClientRect();
  wrapper.style.top = (window.innerHeight - box.height) / 2 + "px";
  wrapper.style.left = (window.innerWidth - box.width) / 2 + "px";

  let submit = () => {
    let params = getValues(options.fields, domFields);
    if (params) {
      close();
      options.callback(params);
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit();
  });

  form.addEventListener("keydown", (e) => {
    if (e.keyCode == 27) {
      e.preventDefault();
      close();
    } else if (e.keyCode == 13 && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
      e.preventDefault();
      submit();
    } else if (e.keyCode == 9) {
      window.setTimeout(() => {
        if (!wrapper.contains(document.activeElement)) close();
      }, 500);
    }
  });

  let input = form.elements[0] as HTMLElement;
  if (input) input.focus();
}

function getValues(fields: any[], domFields: any[]) {
  let result = Object.create(null),
    i = 0;
  for (let name in fields) {
    let field = fields[name],
      dom = domFields[i++];
    let value = field.read(dom),
      bad = field.validate(value);
    if (bad) {
      reportInvalid(dom, bad);
      return null;
    }
    result[name] = field.clean(value);
  }
  return result;
}

function reportInvalid(dom: HTMLElement, message: string) {
  // FIXME this is awful and needs a lot more work
  let parent = dom.parentNode;
  let msg = parent!.appendChild(document.createElement("div"));
  msg.style.left = dom.offsetLeft + dom.offsetWidth + 2 + "px";
  msg.style.top = dom.offsetTop - 5 + "px";
  msg.className = "ProseMirror-invalid";
  msg.textContent = message;
  setTimeout(() => parent!.removeChild(msg), 1500);
}

// ::- The type of field that `FieldPrompt` expects to be passed to it.
export class Field {
  options: any;
  // :: (Object)
  // Create a field with the given options. Options support by all
  // field types are:
  //
  // **`value`**`: ?any`
  //   : The starting value for the field.
  //
  // **`label`**`: string`
  //   : The label for the field.
  //
  // **`required`**`: ?bool`
  //   : Whether the field is required.
  //
  // **`validate`**`: ?(any) → ?string`
  //   : A function to validate the given value. Should return an
  //     error message if it is not valid.
  constructor(options: any) {
    this.options = options;
  }

  // render:: (state: EditorState, props: Object) → dom.Node
  // Render the field to the DOM. Should be implemented by all subclasses.

  // :: (dom.Node) → any
  // Read the field's value from its DOM node.
  read(dom: any) {
    return dom.value;
  }

  // :: (any) → ?string
  // A field-type-specific validation function.
  validateType(_value: string) {
      return false
  }

  validate(value: string) {
    if (!value && this.options.required) return "Required field";
    return (
      this.validateType(value) ||
      (this.options.validate && this.options.validate(value))
    );
  }

  clean(value: string) {
    return this.options.clean ? this.options.clean(value) : value;
  }
}

// ::- A field class for single-line text fields.
export class TextField extends Field {
  render() {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = this.options.label;
    input.value = this.options.value || "";
    input.autocomplete = "off";
    return input;
  }
}
