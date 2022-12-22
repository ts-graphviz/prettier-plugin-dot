import { ASTNode } from 'ts-graphviz/ast';
import { AstPath, doc, Doc, Options, ParserOptions } from 'prettier';

const {
  builders: { group, indent, softline, hardline },
} = doc;

export function embed(
  path: AstPath<ASTNode>,
  textToDoc: (text: string, options: Options) => Doc,
  options: ParserOptions,
): Doc | undefined {
  const node = path.getValue();
  if (node.type == 'Literal' && node.quoted === 'html') {
    const htmlLike = textToDoc(node.value, { ...options, parser: 'html' });
    if (Array.isArray(htmlLike)) {
      const index = htmlLike.lastIndexOf(hardline);
      htmlLike.splice(index, 1);
    }
    return group(['<', indent([softline, htmlLike]), softline, '>']);
  }
}
