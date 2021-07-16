/**
 * @description @ 用户关系 service
 * @author shima_lee
 */
const { Blog, AtRelation, User } = require('../db/model/index.js')
const { formatBlog, formatUser } = require('../services/_format')

/**
 * 创建微博 @ 用户的关系
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId,
    })

    return result.dataValues
}

/**
 * 获取未读at数量
 * @param {*} userId 
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    console.log(result.count)

    return result.count
}

/**
 * 获取at用户的微博列表
 * @param {*} param0 
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attribute: ['userId', 'blogId'],
                where: { userId }
            },
            {
                model: User,
                attribute: ['userName', 'nickname', 'picture']
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)
    console.log(result.count)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    console.log(blogList)

    return {
        count: result.count,
        blogList
    }
}

/**
 * 更新内容
 * @param {*} newIsRead 更新内容
 * @param {*} { userId, isRead } 查询条件
 */
async function updateAtRelation(
    { newIsRead },
    { userId, isRead }
) {
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }

    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }

    //执行更新
    const result = await AtRelation.update(updateData, { 
        where: whereData
    })
    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}