
const { Blog,UserRelation,User} = require('../db/model/index')
const {formatUser} = require('./_format')
const blog = require('../cache/blog')
/**
 * @description 添加新微博
 * @param {*} content 微博内容
 * @param {*} image 图片地址
 */
async function createBlog({ content, image, userId }) {
    const result = await Blog.create({ content, image, userId })
    return result.dataValues
}


/**
 * 根据用户获取微博列表
 * @param {string} 查询参数 
 */
async function getBlogListByUser(
    { userName, pageIndex = 0, pageSize = 10 }
) {
    const userWhereOpt = {}
    if (userName) {
        userWhereOpt.userName = userName
    }

    const result = await Blog.findAndCountAll({
        limit: pageSize, //每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpt
            }
        ]
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = blogList.map(item=>{
        const user = item.user.dataValues
        item.user = formatUser(user) 
        return item
    })
    
    return {
        count:result.count,
        blogList
    }

}


/**
 * 获取关注者的微博
 * @param {*} param0 
 */
async function getFollowersBlogList({userId,pageIndex=0,pageSize=10}){
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize*pageIndex,
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes: ['userName', 'nickName', 'picture'],
            },
            {
                model:UserRelation,
                attributes:['userId','followerId'],
                where:{userId}
            }
        ]
    })

    let blogList = result.rows.map(row=>row.dataValues)
    blogList= formatUser(blogList)
    blogList = blogList.map(item=>{
        item.user = formatUser(item.user.dataValues)
        return item
    })
    return {
        count:result.count,
        blogList
    }
}


module.exports = {
    createBlog, getBlogListByUser,getFollowersBlogList
}

