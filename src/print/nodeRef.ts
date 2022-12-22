import { NodeRefASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';

const {
  builders: { join },
} = doc;

export function printNodeRef({ node, path, print }: PrintOption<NodeRefASTNode>): Doc {
  return join(':', [
    path.call(print, 'id'),
    ...(node.port ? [path.call(print, 'port')] : []),
    ...(node.compass ? [path.call(print, 'compass')] : []),
  ]);
}
