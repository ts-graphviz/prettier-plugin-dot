import { AttributeASTNode } from 'ts-graphviz/ast';
import { Doc } from 'prettier';
import { PrintOption } from './types.js';

export function printAttribute({ path, print }: PrintOption<AttributeASTNode>): Doc {
  return [path.call(print, 'key'), '=', path.call(print, 'value'), ';'];
}
