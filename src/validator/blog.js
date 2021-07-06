/**
 * @description 博客数据格式校验
 * @author shima_lee
 */

const validate = require('./_validate')
// 校验规则

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
        
    }
}

/**
 * 校验播客数据格式
 * @param {Object} data 播客数据
 * @returns 
 */
function blogValidate(data={}) {
    return validate(SCHEMA, data)
}


module.exports = blogValidate