import { format } from './util';

test('simple node', () => {
  expect(
    format(`
    digraph {
      a
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      a;
    }

  `);
});

test('node with attributes', () => {
  expect(
    format(`
    digraph {
      a [color=red; style=filled, ];
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      a [
        color=red;
        style=filled;
      ];
    }

  `);
});
