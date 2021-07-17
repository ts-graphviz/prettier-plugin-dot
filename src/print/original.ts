import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { literalline },
} = doc;

export function printOriginal({ node, options }: PrintOption<AST.ASTNode>): Doc {
  return options.originalText
    .slice(options.locStart(node), options.locEnd(node))
    .split('\n')
    .flatMap((o, i) => (i == 0 ? o : [literalline, o]));
}
