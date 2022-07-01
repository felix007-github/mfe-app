interface CaseAct {
  xml: string;
  doc: Document;
  sections: Array<object>;
  affectUnit: Array<object>;
  enactDate: string;
  actNormcite: string;
  chapter: string;
  session_num: string;
}

interface ActCaseInfo {
  title: string | null;
  enacted: string | null;
}

interface ActFilter {
  year: string | null;
  bill: number | null;
  section: number | null;
}

interface ActParams {
  jx: string;
  year: number;
  bill: string;
}

enum ActStatus {
  Empty,
  Init,
  Load,
  Error,
  Done,
}

interface StoreState {
  userInfo: {
    name: string | number;
  };
  jx: string;
}
interface TargatItem {
  title: string;
  introduce: string;
  content: Element;
}
interface TargatParams {
  jx: string;
  code_normcite: string;
  effective_date?: string;
  enacted_date?: string;
}
interface actItem {
  code_normcite: string;
  effect: string;
  effective_date: string;
}
interface actResultType {
  section_num: string;
  affect_units: Array<actItem>;
}
export { CaseAct, ActCaseInfo, ActFilter, ActStatus, ActParams, StoreState, TargatItem, TargatParams, actResultType, actItem };
