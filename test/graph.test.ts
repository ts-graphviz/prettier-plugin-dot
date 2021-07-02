import { format } from './util';

test('anonymous digraph', () => {
  expect(
    format(`
      digraph {

      }
    `),
  ).toMatchInlineSnapshot(`digraph {}`);
});

test('anonymous graph', () => {
  expect(
    format(`
      graph {
      }
    `),
  ).toMatchInlineSnapshot(`graph {}`);
});

test('strict anonymous graph', () => {
  expect(
    format(`
      strict graph { }
    `),
  ).toMatchInlineSnapshot(`strict graph {}`);
});

test('strict anonymous digraph', () => {
  expect(
    format(`
    strict digraph { }
    `),
  ).toMatchInlineSnapshot(`strict digraph {}`);
});

test('named digraph', () => {
  expect(
    format(`
      digraph hoge { }
    `),
  ).toMatchInlineSnapshot(`digraph hoge {}`);
});

test('long name digraph', () => {
  expect(
    format(`
    digraph hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge { }
    `),
  ).toMatchInlineSnapshot(`
    digraph hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
    {}
  `);
});
