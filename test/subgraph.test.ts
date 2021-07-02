import { format } from './util';

test('anonymous subgraph', () => {
  expect(
    format(`
    digraph { subgraph {} }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      subgraph {

      }
    }
  `);
});

test('named subgraph', () => {
  expect(
    format(`
    digraph {
      subgraph hoge {}
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      subgraph hoge {

      }
    }
  `);
});
