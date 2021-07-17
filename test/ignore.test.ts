import { format } from './util';

test('ignore', () => {
  expect(
    format(`
    digraph
    {
      // prettier-ignore
      node [ style=dashed ]
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      // prettier-ignore
      node [ style=dashed ]
    }
  `);
});
