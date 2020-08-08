/**
 * @description user services 
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 用户密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    // 查询
    const result = await User.findOne({
        attrbutes: ['id', 'userName', 'nickName', 'picture', 'city', 'gender'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }
    const formatRes = formatUser(result.dataValues)
    // 格式化
    return formatRes
}


module.exports = {
    getUserInfo
}