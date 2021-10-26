import { AST } from '@ts-graphviz/parser';
import { Plugin } from 'prettier';

declare const plugin: Plugin<AST.ASTNode>;

export default plugin;
