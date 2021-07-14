/**
 * @description 用户关系 controller
 * @author shima_lee
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower, addFollower, deleteFollower, getFollowerByUser } = require('../services/user-relation')
const { deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 根据userid获取粉丝列表
 * @param {*} userId 用户id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({count, userList})

}

/**
 * 根据userid获取关注人列表
 * @param {*} userId 
 */
async function getFollower(userId) {
    const {count, userList} = await getFollowerByUser(userId)

    return new SuccessModel(
        {
            count,
            followersList: userList
        }
    )
    // service
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        return new ErrorModel(addFollowerFailInfo)
    }
    // services
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel(deleteFollowerFailInfo)
    }
    // services
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollower
}