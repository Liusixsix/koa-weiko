/*
 * @Description:  
 * @Author: liu yan
 * @Date: 2020-07-31 20:45:24
 * @LastEditTime: 2020-07-31 21:05:51
 */ 
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
