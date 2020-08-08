const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    console.log('index')
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    const session = ctx.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum++
    ctx.body = {
        viewNum: session.viewNum
    }
    //  console.log(sission)
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'zhelishi json'
    }
})

module.exports = router
