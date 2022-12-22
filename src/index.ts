import { Parser, Printer, SupportLanguage } from 'prettier';
import { DotParser } from './parser.js';
import { DotASTPrinter } from './printer.js';

export const languages: SupportLanguage[] = [
  {
    name: 'dot',
    parsers: ['dot-parser'],
    extensions: ['.dot', '.gv', '.DOT'],
    vscodeLanguageIds: ['dot'],
  },
];

export const parsers: { [parserName: string]: Parser } = {
  'dot-parser': DotParser,
};

export const printers: { [astFormat: string]: Printer } = {
  'dot-ast': DotASTPrinter,
};
