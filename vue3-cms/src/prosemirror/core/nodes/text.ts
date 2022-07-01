import { INode } from '../Interface';
import { SPEC_TYPE } from '../enums';

export class Text implements INode {
  name = 'text';
  type = SPEC_TYPE.NODE;
  content = 'block+';
}
