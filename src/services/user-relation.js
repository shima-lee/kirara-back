/**
 * @description 用户关系 service
 * @author shima_lee
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('../services/_format')


/**
 * 获取关注该用户的用户列表
 * @param {number} follower 被关注人id
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickname', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: UserRelation,
            where: {
                followerId
            }
        }]
    })

    // result.count 总数
    // result.rows 查询结果

    // 格式化
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 获取关注人列表
 * @param {number} userId 
 */
async function getFollowerByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickname', 'picture']
            }
        ],
        where: {
            userId
        }
    })

    let userList = result.rows.map(row => row.dataValues)
    
    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({ 
        userId,
        followerId
    })
    return result.datavalues
}

/**
 * 取消关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where:{
            userId,
            followerId
        }
    })
    return result > 0
}
module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowerByUser
}