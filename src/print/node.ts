import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join, hardline, group, indent, line, softline },
} = doc;

export function printNode({ node, path, print }: PrintOption<AST.Node>): Doc {
  return node.body.length === 0
    ? [path.call(print, 'id'), ';']
    : [group([path.call(print, 'id'), ' [']), indent([line, join(hardline, path.map(print, 'body'))]), softline, '];'];
}
