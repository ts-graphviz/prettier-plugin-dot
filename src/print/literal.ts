import { AST } from '@ts-graphviz/parser';
import { Doc, util } from 'prettier';
import { PrintOption } from './types';

const { makeString } = util;

export function printLiteral({ node }: PrintOption<AST.Literal>): Doc {
  switch (node.quoted) {
    case true:
      return makeString(node.value, '"');
    case false:
      return node.value;
    case 'html':
      return ['<', node.value, '>'];
  }
}
