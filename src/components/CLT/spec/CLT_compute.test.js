import { textAtomizer } from "../CLT_compute";

test("textAtomizer is a function ", () => {
  expect(typeof textAtomizer === "function").toBe(true);
});

// * chars
describe("Results for 'chars'", () => {
  test("chars -> textAtomizer('test', false) returns a result with length of 3", () => {
    const result = textAtomizer("test", false);
    expect(result.length).toBe(3);
  });
  test("chars -> textAtomizer('test', false) returns first symbol of 't' ", () => {
    const result = textAtomizer("test", false);
    expect(result[0].symbol).toBe("t");
  });
  test("chars -> textAtomizer('test', false) returns 0.20000 rate for 'tesla' ", () => {
    const result = textAtomizer("tesla", false);
    expect(result[0].rate).toBe("0.20000");
  });
});

// * words
describe("Results for 'words'", () => {
  test("word -> textAtomizer('test', true) return result with length of 1", () => {
    const result = textAtomizer("test", true);
    expect(result.length).toBe(1);
  });
  test("word -> textAtomizer('test', true) returns first symbol of 'test' ", () => {
    const result = textAtomizer("test", true);
    expect(result[0].symbol).toBe("test");
  });
  test("word -> textAtomizer('test', true) returns 1.00000 rate of 'test' ", () => {
    const result = textAtomizer("test", true);
    expect(result[0].rate).toBe("1.00000");
  });
  test("word -> textAtomizer('test', true) returns 0.50000 rate of 'test one' ", () => {
    const result = textAtomizer("test one", true);
    expect(result[0].rate).toBe("0.50000");
  });
});
