/**
 * @description user controller
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { doCrypto } = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel({
            errno: 10003,
            message: '用户名可使用'
        })
    }
}

/**
 * 注册
 * @param {string} userName  
 * @param {string} password 
 * @param {number} gender  
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel({
            errno: 10001,
            message: '用户已存在'
        })
    }
    try {
        await createUser({ 
            userName, 
            password:doCrypto(password),
            gender 
        })
        return new SuccessModel()
    } catch (err) {
        return new ErrorModel({
            errno: 10002,
            message: '注册失败'
        })
    }
}

/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx,userName,password){
    const userInfo =  await getUserInfo(userName,doCrypto(password))
    if(!userInfo){
        return new ErrorModel({
            errno:10001,
            message:'登录失败'
        })
    }
    // 登录成功
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string}} userName 用户名
 */
async function  delectCurUser(userName) {
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel({
        errno:10001,
        message:'删除用户失败'
    })
}


module.exports = {
    isExist, register,login,delectCurUser
}