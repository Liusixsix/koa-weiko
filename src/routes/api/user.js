/**
 * @description user api 路由
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {

})

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    console.log(ctx.request.body)
    ctx.body = await isExist(userName)
})

module.exports = router