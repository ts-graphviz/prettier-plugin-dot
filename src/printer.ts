import { AST } from '@ts-graphviz/parser';
import { Printer, AstPath, Doc, ParserOptions } from 'prettier';
import { printAttribute } from './print/attribute';
import { printAttributes } from './print/attributes';
import { printComment } from './print/comment';
import { printDot } from './print/dot';
import { printEdge } from './print/edge';
import { embed } from './print/embed';
import { printGraph } from './print/graph';
import { printLiteral } from './print/literal';
import { printNode } from './print/node';
import { printNodeRef } from './print/nodeRef';
import { printSubgraph } from './print/subgraph';

export const DotASTPrinter: Printer<AST.ASTNode> = {
  print(path: AstPath<AST.ASTNode>, options: ParserOptions, print: (path: AstPath) => Doc): Doc {
    const node = path.getValue();
    switch (node.type) {
      case AST.Types.Dot:
        return printDot({ node, path, options, print });
      case AST.Types.Graph:
        return printGraph({ node, path, options, print });
      case AST.Types.Attribute:
        return printAttribute({ node, path, options, print });
      case AST.Types.Attributes:
        return printAttributes({ node, path, options, print });
      case AST.Types.Comment:
        return printComment({ node, path, options, print });
      case AST.Types.Edge:
        return printEdge({ node, path, options, print });
      case AST.Types.Node:
        return printNode({ node, path, options, print });
      case AST.Types.Literal:
        return printLiteral({ node, path, options, print });
      case AST.Types.NodeRef:
        return printNodeRef({ node, path, options, print });
      case AST.Types.Subgraph:
        return printSubgraph({ node, path, options, print });
    }
  },
  embed(path, print, textToDoc, options) {
    return embed(path, textToDoc, options) ?? null;
  },
};
