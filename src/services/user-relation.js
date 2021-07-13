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
    let userList = result.rows.map(row => row.datavalues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

module.exports = {
    getUsersByFollower
}