import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join },
} = doc;

export function printNodeRefGroup({ path, print }: PrintOption<AST.NodeRefGroup>): Doc {
  return ['{ ', join(' ', path.map(print, 'body')), ' }'];
}
