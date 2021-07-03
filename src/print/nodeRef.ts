import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join },
} = doc;

export function printNodeRef({ node, path, print }: PrintOption<AST.NodeRef>): Doc {
  return join(':', [
    path.call(print, 'id'),
    ...(node.port ? [path.call(print, 'port')] : []),
    ...(node.compass ? [path.call(print, 'compass')] : []),
  ]);
}
