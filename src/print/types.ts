import { ASTBaseNode, ASTNode } from 'ts-graphviz/ast';
import { AstPath, Doc, ParserOptions } from 'prettier';

export interface PrintOption<N extends ASTBaseNode> {
  node: N;
  path: AstPath<ASTNode>;
  options: ParserOptions;
  print: (path: AstPath) => Doc;
}
