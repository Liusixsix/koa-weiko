/**
 * @description 验证中间件
 */

const { ErrorModel } = require('../model/ResModel')

/**
 * 
 * @param {function} validateFn  验证函数
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        console.log(error)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel({
                errno: 10001,
                message: '数据格式验证失败'
            })
            return
        }
        // 验证成功
        await next()
    }
    return validator
}



module.exports = {
    genValidator
}