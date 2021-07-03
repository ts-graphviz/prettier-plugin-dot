import { AST } from '@ts-graphviz/parser';
import { AstPath, doc, Doc, Options, ParserOptions } from 'prettier';

const {
  builders: { group, indent, softline, hardline },
} = doc;

export function embed(
  path: AstPath<AST.ASTNode>,
  textToDoc: (text: string, options: Options) => Doc,
  options: ParserOptions,
): Doc | undefined {
  const node = path.getValue();
  if (node.type == AST.Types.Literal && node.quoted === 'html') {
    const htmlLike = textToDoc(node.value, { ...options, parser: 'html' });
    if (Array.isArray(htmlLike)) {
      const index = htmlLike.lastIndexOf(hardline);
      htmlLike.splice(index, 1);
    }
    return group(['<', indent([softline, htmlLike]), softline, '>']);
  }
}
