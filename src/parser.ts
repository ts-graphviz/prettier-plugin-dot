/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ASTNode, parse } from 'ts-graphviz/ast';
import { Parser } from 'prettier';

export const DotParser: Parser<ASTNode> = {
  parse(text: string) {
    return parse(text);
  },
  hasPragma(text: string) {
    try {
      parse(text);
      return true;
    } catch {
      return false;
    }
  },
  locStart(node) {
    return node.location!.start.offset;
  },
  locEnd(node) {
    return node.location!.end.offset;
  },
  astFormat: 'dot-ast',
};
