/**
 * @description 登录验证中间件
 */
const { ErrorModel } = require('../model/ResModel')

/**
 * api登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx,next){
    if(ctx.session&&ctx.session.userInfo){
        await next()
        return
    }
    ctx.body = new ErrorModel({
        errno:10001,
        message:'尚未登录'
    })
}

/**
 * 页面登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx,next){
    if(ctx.session&&ctx.session.userInfo){
        await next()
        return
    }
    // 未登录
    const cuUrl = ctx.cuUrl
    console.log(cuUrl)
    ctx.redirect('/login?url='+encodeURIComponent(cuUrl))
}


module.exports = {
    loginCheck,loginRedirect
}