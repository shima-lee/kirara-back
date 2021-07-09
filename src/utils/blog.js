/**
 * @description 微博数据相关工具方法
 * @author shima_lee
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs内容

const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()


/**
 *  根据bloglist渲染出html字符串
 * @param {Array} blogList 
 * @param {boolean} canReply 
 * @returns 
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}