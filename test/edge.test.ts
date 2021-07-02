import { format } from './util';

test('simple edge', () => {
  expect(
    format(`
    digraph { a->b; }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      a -> b;
    }
  `);

  expect(
    format(`
    graph { a -- b }
    `),
  ).toMatchInlineSnapshot(`
    graph {
      a -- b;
    }
  `);
});

test('complex edge', () => {
  expect(
    format(`
    digraph { a:n->b:p1->c:p1:e }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      a:n -> b:p1 -> c:p1:e;
    }
  `);
});

test('edge with attributes', () => {
  expect(
    format(`
    digraph {
      a -> b [ style=dashed ]
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      a -> b [
        style=dashed;
      ];
    }
  `);
});
