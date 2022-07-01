interface ResDatas {
  sourceXml: unknown
}

interface JxKeyItem {
  key: string;
  value: string;
  disabled: boolean
}

interface JxMapModel {
  [index: number]: Array<JxKeyItem>
}

interface AmendNoteModel {
  jx: string;
  act_normcite: string;
  enacted_date: string;
  code_normcite: string;
  effective_date: string;
}

interface BusDataModel {
  [otherKey: string]: unknown
}

export {
  ResDatas,
  JxMapModel,
  BusDataModel,
  AmendNoteModel
};
