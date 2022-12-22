import { NodeRefGroupASTNode } from 'ts-graphviz/ast';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types.js';

const {
  builders: { join },
} = doc;

export function printNodeRefGroup({ path, print }: PrintOption<NodeRefGroupASTNode>): Doc {
  return ['{ ', join(' ', path.map(print, 'children')), ' }'];
}
