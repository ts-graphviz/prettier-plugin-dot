import { doc, Doc } from 'prettier';
import { ASTNode, CommentASTNode } from 'ts-graphviz/ast';
import { PrintOption } from './types.js';

const {
  builders: { join, hardline, literalline },
} = doc;

export function isPrettierIgnoreComment(comment: CommentASTNode): boolean {
  return comment.value.trim() === 'prettier-ignore';
}

export function printOriginal(option: PrintOption<ASTNode>): Doc {
  return getOriginal(option)
    .split('\n')
    .flatMap((o, i) => (i == 0 ? o : [literalline, o]));
}

export function printBody({ path, print, options }: PrintOption<ASTNode>): Doc {
  const parts: Doc[] = [];
  path.each((pathChild, i, nodes) => {
    const prevNode: ASTNode = nodes[i - 1];
    if (prevNode && prevNode.type === 'Comment' && prevNode.value.trim() === 'prettier-ignore') {
      const childNode = pathChild.getValue();
      parts.push(printOriginal({ node: childNode, path: pathChild, print, options }));
    } else {
      parts.push(print(pathChild));
    }
  }, 'children');

  return join(hardline, parts);
}

export function getOriginal({ node, options }: PrintOption<ASTNode>): string {
  return options.originalText.slice(options.locStart(node), options.locEnd(node));
}
