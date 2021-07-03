import { AST } from '@ts-graphviz/parser';
import { AstPath, doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join, indent, group, softline, line },
} = doc;

function getGraph(path: AstPath<AST.ASTNode>): AST.Graph | null {
  let count = 0;
  while (true) {
    const node = path.getParentNode(count++);
    if (node === null) {
      return null;
    } else if (node.type === AST.Types.Graph) {
      return node;
    }
  }
}

export function printEdge({ node, path, print }: PrintOption<AST.Edge>): Doc {
  return node.body.length === 0
    ? [group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ';'])]
    : [
        group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ' [']),
        indent([line, path.map(print, 'body')]),
        softline,
        '];',
      ];
}
