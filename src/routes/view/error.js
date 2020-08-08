/**
 * @description error 404
 */

const { createContext } = require('../../app')

const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router