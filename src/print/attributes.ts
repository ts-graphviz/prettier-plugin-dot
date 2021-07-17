import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { printBody } from './utils';

const {
  builders: { group, indent, hardline, line },
} = doc;

export function printAttributes(option: PrintOption<AST.Attributes>): Doc {
  const { node } = option;
  return [group([node.kind, ' [']), indent([line, printBody(option)]), hardline, '];'];
}
