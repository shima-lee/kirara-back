/**
 * @description json test
 * @author shima_lee
 */
const server = require('./server')

test('json 接口返回格式正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json',
    "viewNum": 1
  })
})