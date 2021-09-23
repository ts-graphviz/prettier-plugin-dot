import { format } from './util';

test('slash comment', () => {
  expect(
    format(`
    // hoge
    // fuga
    digraph { }
    `),
  ).toMatchInlineSnapshot(`
    // hoge
    // fuga
    digraph {}

  `);
});

test('macro comment', () => {
  expect(
    format(`
    #foo
    digraph { }
    `),
  ).toMatchInlineSnapshot(`
    # foo
    digraph {}

  `);
});

test('block comment', () => {
  expect(
    format(`
    /*
     A
     B
     C
     */
    digraph { }
    `),
  ).toMatchInlineSnapshot(`
    /**
     * A
     * B
     * C
     */
    digraph {}

  `);

  expect(
    format(`
    /* hoge */
    digraph { }
    `),
  ).toMatchInlineSnapshot(`
    /**
     * hoge
     */
    digraph {}

  `);
});
