const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db')
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
// onerrorConf= {
//     redirect:'/error',//错误时跳转到error
// }
onerror(app, onerrorConf)

app.use(async (ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                code: 401,
                msg: 'token验证失败'
            }
        } else {
            throw err
        }
    })
})
app.use(jwtKoa({
    secret: 'key'
}).unless({
    path: [/^\/users\/login/], //自定义忽略那些目录 jwt验证
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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
    // store: redisStore({
    //     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    // })
}))




// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
