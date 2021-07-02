import Prettier, { Options } from 'prettier';
import * as plugin from '../src/index';

/**
 * Format `source` dot code using Prettier to format/render
 * the code.
 *
 * @param source - code to be formatted
 * @param options - prettier options
 * @returns formatted code
 */
export function format(source: string, options: Options = {}): string {
  return Prettier.format(source, {
    printWidth: 80,
    useTabs: false,
    tabWidth: 2,
    ...options,
    parser: 'dot-parser',
    plugins: [plugin],
  });
}
