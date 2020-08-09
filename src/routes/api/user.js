/**
 * @description user api 路由
 */

const router = require('koa-router')()
const { isExist, register, login, delectCurUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delect', loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境下 登录账号之后 删除自己
        const { userName } = ctx.session.userInfo
        console.log(ctx.session.userInfo)
        ctx.body = await delectCurUser(userName)
    }
})


module.exports = router