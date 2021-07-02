import { AST } from '@ts-graphviz/parser';
import { Printer, doc, AstPath, Doc, util } from 'prettier';

const {
  builders: { group, join, indent, hardline, softline, line, ifBreak },
} = doc;

function getGraph(path: AstPath<AST.ASTNode>): AST.Graph | null {
  const node: AST.ASTNode | null = null;
  let count = 0;
  do {
    const node = path.getParentNode(count++);
    if (node !== null && node.type === AST.Types.Graph) {
      return node;
    }
  } while (node !== null);
  return null;
}

export const DotASTPrinter: Printer<AST.ASTNode> = {
  print(path: AstPath<AST.ASTNode>, options, print): Doc {
    const node = path.getValue();
    switch (node.type) {
      case AST.Types.Dot:
        return join(hardline, path.map(print, 'body'));
      case AST.Types.Graph:
        const parts: Doc[] = [];
        if (node.strict) {
          parts.push('strict ');
        }
        parts.push(node.directed ? 'digraph ' : 'graph ');
        if (node.id) {
          parts.push(path.call(print, 'id'), ' ');
        }

        if (node.body.length > 0) {
          return [
            group([parts, softline, '{']),
            indent([line, join(softline, path.map(print, 'body'))]),
            softline,
            '}',
          ];
        }
        return [group([parts, softline, '{']), '}'];
      case AST.Types.Attribute:
        return [path.call(print, 'key'), '=', path.call(print, 'value'), ';'];
      case AST.Types.Attributes:
        return [group([node.kind, ' [']), indent([line, path.map(print, 'body')]), hardline, '];'];
      case AST.Types.Comment:
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
      case AST.Types.Edge:
        const graph = getGraph(path);
        if (node.body.length > 0) {
          return [
            group([join(graph?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ' [']),
            indent([line, path.map(print, 'body')]),
            softline,
            '];',
          ];
        }
        return [group([join(graph?.directed ? ' -> ' : ' -- ', path.map(print, 'targets')), ';'])];
      case AST.Types.Node:
        if (node.body.length > 0) {
          return [
            group([path.call(print, 'id'), ' [']),
            indent([line, join(hardline, path.map(print, 'body'))]),
            softline,
            '];',
          ];
        }
        return [path.call(print, 'id'), ';'];
      case AST.Types.Literal:
        switch (node.quoted) {
          case true:
            return util.makeString(node.value, '"');
          case false:
            return node.value;
          case 'html':
            return ['<', node.value, '>'];
        }
      case AST.Types.NodeRef:
        const nodeRef: Doc[] = [path.call(print, 'id')];
        if (node.port) {
          nodeRef.push(path.call(print, 'port'));
        }
        if (node.compass) {
          nodeRef.push(path.call(print, 'compass'));
        }
        return join(':', nodeRef);
      case AST.Types.Subgraph:
        return [
          node.id ? group(['subgraph ', path.call(print, 'id'), ifBreak(softline, ' '), '{']) : 'subgraph {',
          indent([line, join(line, path.map(print, 'body'))]),
          softline,
          '}',
        ];
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
