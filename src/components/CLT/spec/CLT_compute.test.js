import { textAtomizer } from "../CLT_compute";

test("textAtomizer is a function ", () => {
    expect(typeof(textAtomizer) === "function").toBe(true)
})

test("chars -> textAtomizer('test', false) returns a result with length of 3", () => {
    const result = textAtomizer("test", false)
    expect(result.length).toBe(3)
})
test("chars -> textAtomizer('test', false) returns first symbol of 't' ", () => {
    const result = textAtomizer("test", false)
    expect(result[0].symbol).toBe("t")
})
test("word -> textAtomizer('test', true) return result with length of 1", () => {
    const result = textAtomizer("test", true)
    expect(result.length).toBe(1)
})
test("word -> textAtomizer('test', true) returns first symbol of 'test' ", () => {
    const result = textAtomizer("test", true)
    expect(result[0].symbol).toBe("test")
})

