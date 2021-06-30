import { AST } from '@ts-graphviz/parser';
import { Parser } from 'prettier';

export const DotParser: Parser<AST.ASTNode> = {
  parse(text: string) {
    return AST.parse(text);
  },
  hasPragma(text: string) {
    try {
      AST.parse(text);
      return true;
    } catch {
      return false;
    }
  },
  locStart(node) {
    return node.location.start.offset;
  },
  locEnd(node) {
    return node.location.end.offset;
  },
  astFormat: 'dot-ast',
};
