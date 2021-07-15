/**
 * @description 数据格式化
 * @author shima_lee
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } =require('../utils/dt')
/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 * @returns 用户对象
 */
function _formatUserPicture(obj) {
    if (obj.picture === null) {
        obj.picture = DEFAULT_PICTURE
    }

    return obj
}

/**
 * 格式化时间
 * @param {Object} obj 
 * @returns 
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)

    return obj
}

/**
 * 格式化微博对象
 * @param {*} obj 
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content

    // 格式化@
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickname, userName) => {
            return `<a href="/profile/${userName}">@${nickname}</a>`
        }
    )

    return obj
}

/**
 * 格式化用户对象
 * @param {Array|Object} list 用户列表或单个用户对象 
 */
function formatUser(list) {
    if (list === null) {
        return list
    }

    if (list instanceof Array) {
        // 数组形式
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

/**
 * 格式化微博对象
 * @param {Array|Object} list 用户列表或单个用户对象 
 */
function formatBlog(list) {
    if (list === null) {
        return list
    }

    if (list instanceof Array) {
        // 数组形式
        return list.map(_formatDBTime).map(_formatContent)
    }

    // 单个对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog
}