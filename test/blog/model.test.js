/**
 * @description 微博测试数据模型
 * @author shima_lee
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性符合预期', () => {
    //! build会构建一个内存的User实例，但不会提交到数据库
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: 'test.png',
    })

    // 验证各个属性
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('test.png')
})