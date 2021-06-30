import { AST } from '@ts-graphviz/parser';
import { Parser } from 'prettier';

export const DetParser: Parser<AST.ASTNode> = {
  parse(text: string) {
    return AST.parse(text);
  },
  locStart(node) {
    return node.location.start.offset;
  },
  locEnd(node) {
    return node.location.end.offset;
  },
  astFormat: 'dot-ast',
};
