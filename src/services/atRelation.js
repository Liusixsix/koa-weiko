/**
 * @description 微博@用户关系
 */

const AtRelation = require('../db/model/AtRelation')

/**
  * 创建微博的@关系
  * @param {number} blogId 微博id
  * @param {number} userId 用户id
  */
async function createAtRelation(blogId,userId){
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

/**
 * 获取用户@ 数量
 * @param {number} userId 
 */
async function getAtRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where:{
            userId,
            isRead:false
        }
    })
    return result.count
}



module.exports = {
    createAtRelation,getAtRelationCount
}