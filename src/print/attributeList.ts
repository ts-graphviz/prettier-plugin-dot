import { AttributeListASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { printBody } from './utils.js';

const {
  builders: { group, indent, hardline, line },
} = doc;

export function printAttributeList(option: PrintOption<AttributeListASTNode>): Doc {
  const { node } = option;
  return [group([node.kind, ' [']), indent([line, printBody(option)]), hardline, '];'];
}
