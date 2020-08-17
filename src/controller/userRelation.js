/**
 * @description 用户关系
 */
const {getUserByFollower,addFollower,deleteFollower,getFollowersByUser} = require('../services/userRelation')
const { SuccessModel,ErrorModel } = require('../model/ResModel')

/**
  * 根据用户id 获取粉丝列表
  * @param {number} userId 用户id 
  */
async function getFans(userId){
    const {count,userList} = await getUserByFollower(userId)
    return new SuccessModel({
        count,
        fansList:userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId,curUserId){
    try{
        const result = await addFollower(myUserId,curUserId)

        return new SuccessModel()
    }catch(e){
        return new ErrorModel({
            errno:10001,
            message:'添加关注失败'
        })
    }
}
/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId,curUserId){
    
    const result = await deleteFollower(myUserId,curUserId)
    if(result){
        return new SuccessModel()
    }
    
    return new ErrorModel({
        errno:10001,
        message:'取消关注失败'
    })
    
}

// 获取关注人列表
async function getFollowers(userId){
    const {count,userList} = await getFollowersByUser(userId)
    return new SuccessModel({
        count,
        followerList:userList
    })
}

module.exports ={
    getFans,follow,unFollow,getFollowers
}