const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})
// 模拟登陆
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    console.log(userName,password)
    let userInfo
    if (userName == '张三' && password == '123') {
        userInfo = {
            id: 1,
            userName: '张三',
            nickName: '张三',
            gender: 1
        }
    }
    // 加密userinfo
    let token
    if (userInfo) {
        token = jwt.sign(userInfo, 'key', { expiresIn: '1h' })
    }
    if (userInfo == null) {
        ctx.body = {
            code: -1,
            msg: '登录失败'
        }
        return
    }
    ctx.body = {
        code: 0,
        data: token
    }
})

// 获取用户信息
router.get('/getuserinfo', async (ctx, next) =>{
    const token = ctx.header.authorization
    console.log(token)
    try{
        const payload = await verify(token.split(' ')[1],'key')
        ctx.body = {
            code:0,
            userInfo:payload
        }
    }catch(e){
        ctx.body = {
            code:-1,
            userInfo:'token error'
        }
    }
    
})
module.exports = router
