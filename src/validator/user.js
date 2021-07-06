/**
 * @description user 数据格式校验
 * @author shima_lee
 */

const validate = require('./_validate')
// 校验规则

const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickname: {
            type: 'string',
            maxLength: 255
        }
        
    }
}

/**
 * 校验用户输入格式
 * @param {Object} data 用户数据
 * @returns 
 */
function userValidate(data={}) {
    return validate(SCHEMA, data)
}

module.exports = userValidate