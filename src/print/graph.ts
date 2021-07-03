import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join, softline, group, indent, line },
} = doc;

export function printGraph({ node, path, print }: PrintOption<AST.Graph>): Doc {
  const parts: Doc[] = [
    ...(node.strict ? ['strict '] : []),
    node.directed ? 'digraph ' : 'graph ',
    ...(node.id ? [path.call(print, 'id'), ' '] : []),
    softline,
  ];
  return node.body.length === 0
    ? [group([...parts, '{}'])]
    : [group([...parts, '{']), indent([line, join(softline, path.map(print, 'body'))]), softline, '}'];
}
