import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { printBody } from './utils';

const {
  builders: { group, indent, line, softline },
} = doc;

export function printNode(option: PrintOption<AST.Node>): Doc {
  const { node, path, print } = option;
  return node.body.length === 0
    ? [path.call(print, 'id'), ';']
    : [group([path.call(print, 'id'), ' [']), indent([line, printBody(option)]), softline, '];'];
}
