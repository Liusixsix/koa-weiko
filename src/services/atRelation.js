/**
 * @description 微博@用户关系
 */

const AtRelation = require('../db/model/AtRelation')
const Blog = require('../db/model/Blog')
const User = require('../db/model/User')
const {formatUser} = require('./_format')
const blog = require('../cache/blog')

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


/**
 * 获取用户的 @ 列表
 * @param {*} param0 
 */
async function getAtUserBlogList({userId,pageIndex,pageSize=10}){
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize * pageIndex,
        include:[
            {
                model:AtRelation,
                attributes:['userId','blogId'],
                where:{
                    userId
                }
            },
            {
                model:User,
                attributes: ['userName', 'nickName', 'picture'],
            }
        ]
    })

    let blogList = result.rows.map(row=>row.dataValues)
    blogList = blogList.map(blogItem=>{
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        count:result.count,
        blogList
    }
}



module.exports = {
    createAtRelation,getAtRelationCount,getAtUserBlogList
}