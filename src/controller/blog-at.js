/**
 * @description 微博 @ 关系 controller
 * @author shima_lee
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')

/**
 * 获取@ 我的微博数量
 * @param {*} userId 
 */
async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })

}

/**
 * 获取@ 用户的微博列表
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const { count, blogList } = await getAtUserBlogList({ 
        userId,
        pageSize: PAGE_SIZE,
        pageIndex
    })

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}


/**
 * 标记为已读
 * @param {*} userId 
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation(
            { newIsRead: true },
            { userId, isRead: false }
        )
    } catch (ex) {
        console.error(ex)
    }

}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}