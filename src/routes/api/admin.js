const router = require('koa-router')()
const { getBlogList,delBlogById,updataBlog } = require('../../controller/admin')

router.prefix('/api/admin')


router.post('/getBlogList', async (ctx, next) => {
    const { pageIndex, pageSize, userName } = ctx.request.body
    ctx.body = await getBlogList(userName,pageIndex-1,pageSize)
})

// 删除博客
router.get('/deleteBlog',async(ctx,next)=>{
    const { id } = ctx.query
    ctx.body = await delBlogById(id)
})

// 修改博客
router.post('/updataBlogContent',async(ctx,next)=>{
    const { id,content } = ctx.request.body
    ctx.body = await updataBlog(id,content)
})

module.exports = router
