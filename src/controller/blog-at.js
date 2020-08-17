/**
 * @description 微博 @ 关系
 */
const {getAtRelationCount} = require('../services/atRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
  * 获取at我的数量
  * @param {number} userId 
  */
async function getAtMecount(userId){
    const result = await getAtRelationCount(userId)
    return new SuccessModel({
        count:result
    })
}

module.exports = {
    getAtMecount
}