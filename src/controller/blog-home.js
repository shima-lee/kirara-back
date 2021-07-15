/**
 * @description blog-home controller
 * @author shima_lee
 */

const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')
const xss = require('xss')

/**
 * 新建博客
 * @param {String} userId 
 * @param {String} content 
 * @param {String} image 
 */
async function create({ userId, content, image }) {
    try {
        //创建微博
        const blog = await createBlog({ 
            userId, 
            content: xss(content), 
            image 
        })
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