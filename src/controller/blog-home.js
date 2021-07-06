/**
 * @description blog-home controller
 * @author shima_lee
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
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

module.exports = {
    create
}