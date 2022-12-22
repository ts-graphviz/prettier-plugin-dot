import typescript from 'rollup-plugin-typescript2';

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './src/index.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: 'ESNext',
            declaration: false,
          },
        },
      }),
    ],
    external: ['ts-graphviz/ast', 'prettier'],
    output: [
      {
        format: 'cjs',
        file: './lib/index.cjs',
      },
      {
        format: 'esm',
        file: './lib/index.js',
      },
    ],
  },
  // {
  //   input: './lib/index.d.ts',
  //   plugins: [
  //     del({
  //       targets: ['lib/*.d.ts', '!lib/index.d.ts'],
  //       hook: 'buildEnd',
  //     }),
  //     dts(),
  //   ],
  //   external: ['ts-graphviz'],
  //   output: [
  //     {
  //       format: 'esm',
  //       file: './lib/index.d.ts',
  //     },
  //   ],
  // },
];

export default options;
