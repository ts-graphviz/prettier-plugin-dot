import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { getOriginal } from './utils';

const {
  builders: { literalline },
} = doc;

export function printOriginal(option: PrintOption<AST.ASTNode>): Doc {
  return getOriginal(option)
    .split('\n')
    .flatMap((o, i) => (i == 0 ? o : [literalline, o]));
}
