import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { getOriginal } from './utils';

const {
  builders: { group, ifBreak, softline, indent, join },
} = doc;

const keyword = 'subgraph';

export function printSubgraph(option: PrintOption<AST.Subgraph>): Doc {
  const { node, path, print } = option;
  return getOriginal(option).slice(0, keyword.length).toLowerCase() === keyword
    ? node.body.length === 0
      ? [node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{}']) : 'subgraph {}']
      : [
          node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{']) : 'subgraph {',
          indent([path.map((p) => [softline, print(p)], 'body')]),
          softline,
          '}',
        ]
    : // Short Hand
      ['{ ', join(' ', path.map(print, 'body')), ' }'];
}
