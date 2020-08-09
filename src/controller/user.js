/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
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

module.exports = {
    isExist, register
}