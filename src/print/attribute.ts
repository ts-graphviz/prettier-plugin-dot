import { AST } from '@ts-graphviz/parser';
import { Doc } from 'prettier';
import { PrintOption } from './types';

export function printAttribute({ path, print }: PrintOption<AST.Attribute>): Doc {
  return [path.call(print, 'key'), '=', path.call(print, 'value'), ';'];
}
