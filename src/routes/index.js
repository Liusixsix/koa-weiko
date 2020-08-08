const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json/:username/:pageIndex', async (ctx, next) => {
  const { username ,pageIndex} = ctx.params
  ctx.body = {
    username,
    pageIndex
  }
})

module.exports = router