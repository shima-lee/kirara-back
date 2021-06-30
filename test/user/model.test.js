/**
 * @description 数据模型单元测试
 * @author shima_lee
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性符合预期', () => {
    //! build会构建一个内存的User实例，但不会提交到数据库
    const user = User.build({
        userName: 'zhangsan',
        password: 'p123123',
        nickname: '张三',
        // gender: 1,
        picture: '/xxx.png',
        city: '北京'
    })

    // 验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickname).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})