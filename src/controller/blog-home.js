/**
 * @description blog-home controller
 * @author shima_lee
 */

const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
const xss = require('xss')

/**
 * 新建博客
 * @param {String} userId 
 * @param {String} content 
 * @param {String} image 
 */
async function create({ userId, content, image }) {
    // 分析并收集content中的@用户
    const atUserNameLsit = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickname, userName) => {
            atUserNameLsit.push(userName)
            return matchStr //! 使替换不生效
        }
    )

    // 根据userName查询用户信息

    const atUserList = await Promise.all(
        atUserNameLsit.map(userName => getUserInfo(userName))
    )

    // 根据userInfo 获取 userId
    const atUserIdList = atUserList.map(user => user.id)

    try {
        //创建微博
        const blog = await createBlog({ 
            userId, 
            content: xss(content), 
            image 
        })

        // 创建 @ 关系
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))

        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页微博列表
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    console.log(userId)
    const result = await getFollowersBlogList({userId, pageIndex, pageSize: PAGE_SIZE})

    const { count, blogList } = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })

}

module.exports = {
    create,
    getHomeBlogList
}