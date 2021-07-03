import { AST } from '@ts-graphviz/parser';
import { doc, Doc } from 'prettier';
import { PrintOption } from './types';

const {
  builders: { join, hardline },
} = doc;

export function printComment({ node }: PrintOption<AST.Comment>): Doc {
  switch (node.kind) {
    case AST.Comment.Kind.Slash:
      return join(
        hardline,
        node.value.split('\n').map((l) => join(' ', ['//', l])),
      );
    case AST.Comment.Kind.Macro:
      return join(
        hardline,
        node.value.split('\n').map((l) => join(' ', ['#', l])),
      );
    case AST.Comment.Kind.Block:
      return join(hardline, ['/**', ...node.value.split('\n').map((l) => join(' ', [' *', l])), ' */']);
  }
}
