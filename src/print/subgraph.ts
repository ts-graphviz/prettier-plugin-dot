import { SubgraphASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { getOriginal } from './utils.js';

const {
  builders: { group, ifBreak, softline, indent, join },
} = doc;

const keyword = 'subgraph';

export function printSubgraph(option: PrintOption<SubgraphASTNode>): Doc {
  const { node, path, print } = option;
  return getOriginal(option).slice(0, keyword.length).toLowerCase() === keyword
    ? node.children.length === 0
      ? [node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{}']) : 'subgraph {}']
      : [
          node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{']) : 'subgraph {',
          indent([path.map((p) => [softline, print(p)], 'children')]),
          softline,
          '}',
        ]
    : // Short Hand
      ['{ ', join(' ', path.map(print, 'children')), ' }'];
}
