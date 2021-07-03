import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { group, indent, hardline, line },
} = doc;

export function printAttributes({ node, path, print }: PrintOption<AST.Attributes>): Doc {
  return [group([node.kind, ' [']), indent([line, path.map(print, 'body')]), hardline, '];'];
}
