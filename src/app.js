/*
 * @Description:
 * @Author: liu yan
 * @Date: 2020-07-31 20:45:24
 * @LastEditTime: 2020-07-31 21:03:35
 */
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const koaStatic = require('koa-static')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

// 路由
const squareApiRouter = require('./routes/api/blog-square')
const adminApiRouter = require('./routes/api/admin')
const profileApiRouter = require('./routes/api/blog-profile')
const blogHomeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsApiRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
onerrorConf = {
    redirect: '/error',//错误时跳转到error
}
onerror(app,onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
app.keys = ['udisd_213']
app.use(session({
    key: 'weibo.sid',//cookie name 默认koa.sid
    prefix: 'weibo:sess',//redis key的前缀 默认是 koa:sess
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //ms
    },
    ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))


// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes


app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(adminApiRouter.routes(), adminApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404 页面路由 放到最后

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
