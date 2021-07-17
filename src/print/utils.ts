import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { printOriginal } from './original';
import { PrintOption } from './types';

const {
  builders: { join, hardline },
} = doc;

export function isPrettierIgnoreComment(comment: AST.Comment): boolean {
  return comment.value.trim() === 'prettier-ignore';
}

export function printBody({ path, print, options }: PrintOption<AST.ASTNode>): Doc {
  const parts: Doc[] = [];
  path.each((pathChild, i, nodes) => {
    const prevNode: AST.ASTNode = nodes[i - 1];
    if (prevNode && prevNode.type === AST.Types.Comment && prevNode.value.trim() === 'prettier-ignore') {
      const childNode = pathChild.getValue();
      parts.push(printOriginal({ node: childNode, path: pathChild, print, options }));
    } else {
      parts.push(print(pathChild));
    }
  }, 'body');

  return join(hardline, parts);
}

export function getOriginal({ node, options }: PrintOption<AST.ASTNode>): string {
  return options.originalText.slice(options.locStart(node), options.locEnd(node));
}
