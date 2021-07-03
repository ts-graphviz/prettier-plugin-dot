import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { group, ifBreak, softline, indent },
} = doc;

export function printSubgraph({ node, path, print }: PrintOption<AST.Subgraph>): Doc {
  return node.body.length === 0
    ? [node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{}']) : 'subgraph {}']
    : [
        node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{']) : 'subgraph {',
        indent([path.map((p) => [softline, print(p)], 'body')]),
        softline,
        '}',
      ];
}
