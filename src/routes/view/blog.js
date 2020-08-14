/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const {getSquareBlogList} = require('../../controller/blog-square')
const {isExist} = require('../../controller/user')
// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        blogData: {
            isEmpty: true
        }
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
    let isMe = myUserName ===curUserName
    let curUserinfo
    if(isMe){
        curUserinfo = myUserInfo
    }else{
        const existResult = await isExist(curUserName)
        if(existResult.errno!==0){
            // 用户名不存在
            return
        }
        curUserinfo = existResult.data
    }
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo:curUserinfo,
            isMe
        }
    })
})


router.get('/square',loginRedirect,async(ctx,next)=>{
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