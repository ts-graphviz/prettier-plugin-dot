import { format } from './util';

test('anonymous subgraph', () => {
  expect(
    format(`
    digraph { subgraph {} }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      subgraph {}
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
      subgraph hoge {}
    }

  `);
});

test('subgraph in contents', () => {
  expect(
    format(`
    digraph {
      subgraph hoge {

        a;

        b;

        a -> b [ color=red ];
      }
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      subgraph hoge {
        a;
        b;
        a -> b [
          color=red;
        ];
      }
    }

  `);
});

test('short hand subgraph', () => {
  expect(
    format(`
    digraph {
      { rank=same; A; B C D }
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      { rank=same; A; B; C; D; }
    }

  `);
});
