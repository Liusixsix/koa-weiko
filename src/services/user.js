/**
 * @description user services 
 */

const { User } = require('../db/model/index')
const {addFollower} = require('./userRelation')
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

/**
 * 
 * @param {string} userName  用户名 
 * @param {string} password  密码 
 * @param {number} gender  性别 
 * @param {string} nickName  昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName, password, nickName: nickName ? nickName : userName, gender
    })
    // 自己关注自己
    const data = result.dataValues
    addFollower(data.id,data.id)
    return data
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0  要修改的内容 newPassword,newNickName,newPicture,newCity
 * @param {Object} param1  查询条件 userName,password
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
    const updateData ={}
    if(newPassword){
        updateData.password = newPassword
    }
    if(newNickName){
        updateData.nickName = newNickName
    }
    if(newPicture){
        updateData.picture = newPicture
    }
    if(newCity){
        updateData.city = newCity
    }
    const whereData = {
        userName,
    }
    if(password){
        whereData.password = password
    }

    const result = await User.update(updateData,{
        where:whereData
    })
    console.log(result)
    return result[0]>0
}

module.exports = {
    getUserInfo, createUser, deleteUser,updateUser
}