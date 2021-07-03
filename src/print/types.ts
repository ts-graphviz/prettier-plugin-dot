import { AST } from '@ts-graphviz/parser';
import { AstPath, Doc, ParserOptions } from 'prettier';

export interface PrintOption<N extends AST.ASTBaseNode> {
  node: N;
  path: AstPath<AST.ASTNode>;
  options: ParserOptions;
  print: (path: AstPath) => Doc;
}
