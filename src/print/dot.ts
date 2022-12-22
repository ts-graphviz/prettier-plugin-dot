import { DotASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';
import { printBody } from './utils.js';

const {
  builders: { hardline },
} = doc;

export function printDot(option: PrintOption<DotASTNode>): Doc {
  return [printBody(option), hardline];
}
