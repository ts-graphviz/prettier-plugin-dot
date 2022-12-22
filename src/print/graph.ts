import { GraphASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { printBody } from './utils.js';

const {
  builders: { softline, group, indent, line },
} = doc;

export function printGraph(option: PrintOption<GraphASTNode>): Doc {
  const { node, path, print } = option;
  const parts: Doc[] = [
    ...(node.strict ? ['strict '] : []),
    node.directed ? 'digraph ' : 'graph ',
    ...(node.id ? [path.call(print, 'id'), ' '] : []),
    softline,
  ];
  return node.children.length === 0
    ? [group([...parts, '{}'])]
    : [group([...parts, '{']), indent([line, printBody(option)]), softline, '}'];
}
