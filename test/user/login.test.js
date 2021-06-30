/**
 * @description 用户api接口测试
 * @author shima_lee
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
    userName,
    password,
    nickname: userName,
    gender: 1
}

//存储cookie
let COOKIE = ''


// // 注册
// test('注册用户，应成功 ', async () => {
//     const res = await server
//         .post('/api/user/register')
//         .send(testUser)

//     expect(res.body.errno).toBe(0)
// })


// // 重复注册
// test('重复注册用户应失败', async () => {
//     const res = await server
//         .post('/api/user/register')
//         .send(testUser)

//     expect(res.body.errno).not.toBe(0)
// })


// // 查询用户是否存在
// test('查询注册用户名应存在', async () => {
//     const res = await server
//         .post('/api/user/isExist')
//         .send({ userName })

//     expect(res.body.errno).toBe(0)
// })


// // json schema 检测
// test('非法格式检验', async () => {
//     const res = await server
//         .post('/api/user/register')
//         .send({
//             userName: 123,
//             password: 'a',
//             gender: 'mail'
//         })

//     expect(res.body.errno).not.toBe(0)
// })


// // 登录
// test('登录应成功', async () => {
//     const res = await server
//         .post('/api/user/login')
//         .send({
//             userName,
//             password
//         })

//     expect(res.body.errno).toBe(0)

//     // 获取cookie
//     COOKIE = res.headers['set-cookie'].join(";")
// })

// // 删除
// test('删除用户应成功', async () => {
//     const res = await server
//         .post('/api/user/delete')
//         .set('cookie', COOKIE)

//     expect(res.body.errno).toBe(0)
// })


// // 再次查询用户
// test('再次查询用户名应不存在', async () => {
//     const res = await server
//         .post('/api/user/isExist')
//         .send({ userName })

//     expect(res.body.errno).not.toBe(0)
// })