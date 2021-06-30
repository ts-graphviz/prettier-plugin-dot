import { Parser, Printer, SupportLanguage } from 'prettier';
import { DetParser } from './parser';
import { DotASTPrinter } from './printer';

export const languages: SupportLanguage[] = [
  {
    name: 'dot',
    parsers: ['dot-parser'],
    extensions: ['.dot', '.gv', '.DOT'],
    vscodeLanguageIds: ['dot'],
  },
];

export const parsers: { [parserName: string]: Parser } = {
  'dot-parser': DetParser,
};

export const printers: { [astFormat: string]: Printer } = {
  'dot-ast': DotASTPrinter,
};
