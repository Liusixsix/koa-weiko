/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/userRelation')
const {getHomeBlogList} = require('../../controller/blog-home')
const {getAtMecount} = require('../../controller/blog-at')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const {id:userId} = userInfo

    //获取第一页数据
    const {data:{isEmpty,blogList,count,pageIndex,pageSize}} = await getHomeBlogList(userId)
    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const {data:{ count: followersCount, followerList }} = await getFollowers(userId)
    // 获取 @ 数量
    const {data:{count:atCount}} = await getAtMecount(userId)
    await ctx.render('index', {
        blogData:{
            isEmpty,blogList,count,pageIndex,pageSize
        },
        userData:{
            userInfo,
            fansData:{
                count:fansCount,
                list:fansList
            },
            atCount,
            followersData:{
                count:followersCount,
                list:followerList
            }
        },
    })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    const { userName: curUserName } = ctx.params
    let isMe = myUserName === curUserName
    let curUserinfo
    if (isMe) {
        curUserinfo = myUserInfo
    } else {
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        curUserinfo = existResult.data
    }
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(curUserinfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const {data:{ count: followersCount, followerList }} = await getFollowers(curUserinfo.id)
    // 我是否关注了此人
    const amIFollowed = fansList.some(item => item.userName === myUserName)

    // 获取 @ 数量
    const {data:{count:atCount}} = await getAtMecount(myUserInfo.id)

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserinfo,
            amIFollowed,
            isMe,
            atCount,
            followersData: {
                count:followersCount,
                list:followerList
            },
            fansData: {
                count: fansCount,
                list: fansList
            }
        }
    })
})


router.get('/square', loginRedirect, async (ctx, next) => {
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router