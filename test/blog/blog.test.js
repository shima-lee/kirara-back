/**
 * @description 首页 test
 * @author shima_lee
 */

const server = require('../server')

let COOKIE = ''

// 登录
test('登录应成功2', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: 'zhangsan',
            password: '123'
        })

    expect(res.body.errno).toBe(0)

    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(";")
})

test('创建微博，应成功', async () => {
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '模拟图片_' + Date.now()

    const res = await server
        .post('/api/blog/create')
        .send({ content, image })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
})

test('个人主页，加载第一页数据应成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/zhangsan/0`)
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})


test('广场，加载第一页数据应成功', async () => {
    const res = await server
        .get(`/api/square/loadMore/0`)
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})