/**
 * @description json schema 验证中间件
 * @author shima_lee
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFailInfo } = require('../model/ErrorInfo')

/**
 * 生成schema验证的中间件
 * @param {function} validateFunction 验证函数
 */
function genValidator(validateFunction) {
    //定义中间件函数
    const validator = async (ctx, next) => {
        // 校验
        const data = ctx.request.body
        const error = validateFunction(data)
        console.log(error)
        if (error) {
            // 验证失败
            return ctx.body = new ErrorModel(jsonSchemaFailInfo)
        }
        // 验证成功 继续
        await next()
    }
    return validator
}

module.exports = { genValidator }