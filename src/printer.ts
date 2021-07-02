import { AST } from '@ts-graphviz/parser';
import { Printer, doc, AstPath, Doc, util, ParserOptions } from 'prettier';

const {
  builders: { group, join, indent, hardline, softline, line, ifBreak },
} = doc;

function getGraph(path: AstPath<AST.ASTNode>): AST.Graph | null {
  let count = 0;
  while (true) {
    const node = path.getParentNode(count++);
    if (node === null) {
      return null;
    } else if (node.type === AST.Types.Graph) {
      return node;
    }
  }
}

interface PrintOption<N extends AST.ASTBaseNode> {
  node: N;
  path: AstPath<AST.ASTNode>;
  options: ParserOptions;
  print: (path: AstPath) => Doc;
}

function printDot({ path, print }: PrintOption<AST.Dot>): Doc {
  return join(hardline, path.map(print, 'body'));
}

function printGraph({ node, path, print }: PrintOption<AST.Graph>): Doc {
  const parts: Doc[] = [
    ...(node.strict ? ['strict '] : []),
    node.directed ? 'digraph ' : 'graph ',
    ...(node.id ? [path.call(print, 'id'), ' '] : []),
    softline,
  ];
  return node.body.length === 0
    ? [group([...parts, '{}'])]
    : [group([...parts, '{']), indent([line, join(softline, path.map(print, 'body'))]), softline, '}'];
}

function printAttribute({ path, print }: PrintOption<AST.Attribute>): Doc {
  return [path.call(print, 'key'), '=', path.call(print, 'value'), ';'];
}

function printAttributes({ node, path, print }: PrintOption<AST.Attributes>): Doc {
  return [group([node.kind, ' [']), indent([line, path.map(print, 'body')]), hardline, '];'];
}

function printComment({ node }: PrintOption<AST.Comment>): Doc {
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

function printEdge({ node, path, print }: PrintOption<AST.Edge>): Doc {
  return node.body.length === 0
    ? [group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ';'])]
    : [
        group([join(getGraph(path)?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ' [']),
        indent([line, path.map(print, 'body')]),
        softline,
        '];',
      ];
}

function printNode({ node, path, print }: PrintOption<AST.Node>): Doc {
  return node.body.length === 0
    ? [path.call(print, 'id'), ';']
    : [group([path.call(print, 'id'), ' [']), indent([line, join(hardline, path.map(print, 'body'))]), softline, '];'];
}

function printLiteral({ node }: PrintOption<AST.Literal>): Doc {
  switch (node.quoted) {
    case true:
      return util.makeString(node.value, '"');
    case false:
      return node.value;
    case 'html':
      return ['<', node.value, '>'];
  }
}

function printSubgraph({ node, path, print }: PrintOption<AST.Subgraph>): Doc {
  return node.body.length === 0
    ? [node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{}']) : 'subgraph {}']
    : [
        node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{']) : 'subgraph {',
        indent([path.map((p) => [softline, print(p)], 'body')]),
        softline,
        '}',
      ];
}

function printNodeRef({ node, path, print }: PrintOption<AST.NodeRef>): Doc {
  return join(':', [
    path.call(print, 'id'),
    ...(node.port ? [path.call(print, 'port')] : []),
    ...(node.compass ? [path.call(print, 'compass')] : []),
  ]);
}

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
    const node = path.getValue();
    if (node.type == AST.Types.Literal && node.quoted === 'html') {
      const htmlLike = textToDoc(node.value, { ...options, parser: 'html' });
      if (Array.isArray(htmlLike)) {
        const index = htmlLike.lastIndexOf(hardline);
        htmlLike.splice(index, 1);
      }
      return group(['<', indent([softline, htmlLike]), softline, '>']);
    }
    return null;
  },
};
