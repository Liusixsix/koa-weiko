const router = require('koa-router')()
const { createBlogs } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await createBlogs(content, image, userInfo.id)
})


module.exports = router