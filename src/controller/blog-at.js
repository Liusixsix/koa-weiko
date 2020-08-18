/**
 * @description 微博 @ 关系
 */
const {getAtRelationCount,getAtUserBlogList} = require('../services/atRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constrant')
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


/**
 * @ 我的列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getAtMeBlogList(userId,pageIndex=0){
    const result =  await getAtUserBlogList({userId,pageIndex,pageSize:PAGE_SIZE})
    const {count,blogList} = result
    return new SuccessModel({
        isEmpty:blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    getAtMecount,getAtMeBlogList
}