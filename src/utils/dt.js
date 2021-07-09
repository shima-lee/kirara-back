/**
 * @description 时间相关的工具函数
 * @author shima_lee
 */

const { format } = require('date-fns')

/**
 * 格式化时间
 * @param {string} str 
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:SS')
}

module.exports = {
    timeFormat
}