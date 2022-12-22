import { ASTNode, EdgeASTNode, GraphASTNode } from 'ts-graphviz/ast';
import { AstPath, doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { printBody } from './utils.js';

const {
  builders: { join, indent, group, softline, line },
} = doc;

function getGraph(path: AstPath<ASTNode>): GraphASTNode | null {
  let count = 0;
  while (true) {
    const node = path.getParentNode(count++);
    if (node === null) {
      return null;
    } else if (node.type === 'Graph') {
      return node;
    }
  }
}

export function printEdge(option: PrintOption<EdgeASTNode>): Doc {
  const { node, path, print } = option;
  return node.children.length === 0
    ? [group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ';'])]
    : [
        group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ' [']),
        indent([line, printBody(option)]),
        softline,
        '];',
      ];
}
