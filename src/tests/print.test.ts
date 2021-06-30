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
      label=<
        <b>bold</b>
        >;
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
      label=<
        html like label
        >;
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
