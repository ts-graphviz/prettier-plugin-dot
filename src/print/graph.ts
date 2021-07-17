import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { printBody } from './utils';

const {
  builders: { softline, group, indent, line },
} = doc;

export function printGraph(option: PrintOption<AST.Graph>): Doc {
  const { node, path, print } = option;
  const parts: Doc[] = [
    ...(node.strict ? ['strict '] : []),
    node.directed ? 'digraph ' : 'graph ',
    ...(node.id ? [path.call(print, 'id'), ' '] : []),
    softline,
  ];
  return node.body.length === 0
    ? [group([...parts, '{}'])]
    : [group([...parts, '{']), indent([line, printBody(option)]), softline, '}'];
}
