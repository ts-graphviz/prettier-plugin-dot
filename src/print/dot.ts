import { AST } from '@ts-graphviz/parser';
import { Doc } from 'prettier';
import { PrintOption } from './types';
import { printBody } from './utils';

export function printDot(option: PrintOption<AST.Dot>): Doc {
  return printBody(option);
}
