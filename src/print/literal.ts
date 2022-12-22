import { LiteralASTNode } from 'ts-graphviz/ast';
import { Doc, util } from 'prettier';
import { PrintOption } from './types.js';

const { makeString } = util;

export function printLiteral({ node }: PrintOption<LiteralASTNode>): Doc {
  switch (node.quoted) {
    case true:
      return makeString(node.value, '"');
    case false:
      return node.value;
    case 'html':
      return ['<', node.value, '>'];
  }
}
