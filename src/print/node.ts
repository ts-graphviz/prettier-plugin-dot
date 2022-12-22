import { NodeASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { printBody } from './utils.js';

const {
  builders: { group, indent, line, softline },
} = doc;

export function printNode(option: PrintOption<NodeASTNode>): Doc {
  const { node, path, print } = option;
  return node.children.length === 0
    ? [path.call(print, 'id'), ';']
    : [group([path.call(print, 'id'), ' [']), indent([line, printBody(option)]), softline, '];'];
}
