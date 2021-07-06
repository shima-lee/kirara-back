/**
 * @description 校验
 * @author shima_lee
 */


const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误
})

/**
 * json schema 校验
 * @param {Object} schema schema规则
 * @param {Object} data 带校验数据
 */
function validate(schema, data={}) {
    debugger
    const  valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate