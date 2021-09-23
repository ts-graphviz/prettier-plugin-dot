import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';
import { printBody } from './utils';

const {
  builders: { hardline },
} = doc;

export function printDot(option: PrintOption<AST.Dot>): Doc {
  return [printBody(option), hardline];
}
