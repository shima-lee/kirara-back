/**
 * @description 用户关系 controller
 * @author shima_lee
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

/**
 * 根据userid获取粉丝列表
 * @param {*} userId 用户id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({count, userList})

}

module.exports = {
    getFans
}