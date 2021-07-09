/**
 * @description 数据格式化
 * @author shima_lee
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
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
        return list.map(_formatDBTime)
    }

    // 单个对象
    return _formatDBTime(list)
}

module.exports = {
    formatUser,
    formatBlog
}