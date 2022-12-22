import { ASTNode } from 'ts-graphviz/ast';
import { Printer, AstPath, Doc, ParserOptions } from 'prettier';
import { printAttribute } from './print/attribute.js';
import { printAttributeList } from './print/attributeList.js';
import { printComment } from './print/comment.js';
import { printDot } from './print/dot.js';
import { printEdge } from './print/edge.js';
import { embed } from './print/embed.js';
import { printGraph } from './print/graph.js';
import { printLiteral } from './print/literal.js';
import { printNode } from './print/node.js';
import { printNodeRef } from './print/nodeRef.js';
import { printNodeRefGroup } from './print/nodeRefGroup.js';
import { printSubgraph } from './print/subgraph.js';

export const DotASTPrinter: Printer<ASTNode> = {
  print(path: AstPath<ASTNode>, options: ParserOptions, print: (path: AstPath) => Doc): Doc {
    const node = path.getValue();
    switch (node.type) {
      case 'Dot':
        return printDot({ node, path, options, print });
      case 'Graph':
        return printGraph({ node, path, options, print });
      case 'Attribute':
        return printAttribute({ node, path, options, print });
      case 'AttributeList':
        return printAttributeList({ node, path, options, print });
      case 'Comment':
        return printComment({ node, path, options, print });
      case 'Edge':
        return printEdge({ node, path, options, print });
      case 'Node':
        return printNode({ node, path, options, print });
      case 'Literal':
        return printLiteral({ node, path, options, print });
      case 'NodeRef':
        return printNodeRef({ node, path, options, print });
      case 'NodeRefGroup':
        return printNodeRefGroup({ node, path, options, print });
      case 'Subgraph':
        return printSubgraph({ node, path, options, print });
    }
  },
  embed(path, print, textToDoc, options) {
    return embed(path, textToDoc, options) ?? null;
  },
};
