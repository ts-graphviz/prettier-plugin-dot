import { format } from './util';

test('attributes', () => {
  expect(
    format(`
    digraph {
      node [ style=dashed ]
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      node [
        style=dashed;
      ];
    }
  `);
});

test('HTML Like label', () => {
  expect(
    format(`
    digraph {
      label = <<B>bold</B>>
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      label=<<b>bold</b>>;
    }
  `);

  expect(
    format(`
    digraph {
      label = <html like label>
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      label=<html like label>;
    }
  `);

  expect(
    format(`
    digraph {
      label = <<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0"><TR><TD>left</TD><TD PORT="m">middle</TD><TD PORT="r">right</TD></TR></TABLE>>
    }
    `),
  ).toMatchInlineSnapshot(`
    digraph {
      label=<
        <table border="0" CELLBORDER="1" cellspacing="0">
          <tr>
            <td>left</td>
            <td PORT="m">middle</td>
            <td PORT="r">right</td>
          </tr>
        </table>
      >;
    }
  `);
});
