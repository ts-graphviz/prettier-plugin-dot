import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join, hardline },
} = doc;

export function printDot({ path, print }: PrintOption<AST.Dot>): Doc {
  return join(hardline, path.map(print, 'body'));
}
