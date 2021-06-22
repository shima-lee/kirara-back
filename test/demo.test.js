/**
 * @description test demo
 * @author shima_lee
 */

function sum(a, b) {
  return a + b
}

test('test demo 1', () => {
  const res = sum(1, 2)
  expect(res).toBe(3)
})