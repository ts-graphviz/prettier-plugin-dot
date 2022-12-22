import { doc, Doc } from 'prettier';
import { CommentASTNode } from 'ts-graphviz/ast';
import { PrintOption } from './types.js';

const {
  builders: { join, hardline },
} = doc;

export function printComment({ node }: PrintOption<CommentASTNode>): Doc {
  switch (node.kind) {
    case 'Slash':
      return join(
        hardline,
        node.value.split('\n').map((l) => join(' ', ['//', l])),
      );
    case 'Macro':
      return join(
        hardline,
        node.value.split('\n').map((l) => join(' ', ['#', l])),
      );
    case 'Block':
      return join(hardline, ['/**', ...node.value.split('\n').map((l) => join(' ', [' *', l])), ' */']);
  }
}
