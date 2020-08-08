const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
 
   const session =  ctx.session
   console.log( ctx.session)
   if(session.viewNum==null){
    session.viewNum= 0
   }
   session.viewNum++
   ctx.body = {
    viewNum:session.viewNum
  }
  //  console.log(sission)
})

router.get('/json/:username/:pageIndex', async (ctx, next) => {
  const { username ,pageIndex} = ctx.params
  ctx.body = {
    username,
    pageIndex
  }
})

module.exports = router
