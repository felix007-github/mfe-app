import { INode } from '../Interface';
import { SPEC_TYPE } from '../enums';

export class Doc implements INode {
  name = 'doc';
  type = SPEC_TYPE.NODE;
  content = 'block+';
}
