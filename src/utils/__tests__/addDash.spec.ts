import { addDash } from "../addDash";

describe(`addDash`, () => {
  it(`adds a dash between two strings`, () => {
    const actual = addDash(`foo`, `bar`);
    const expected = `foo-bar`;

    expect(actual).toStrictEqual(expected);
  });

  it(`returns the second argument if the first is empty`, () => {
    const actual = addDash(``, `bar`);
    const expected = `bar`;

    expect(actual).toStrictEqual(expected);
  });
});
