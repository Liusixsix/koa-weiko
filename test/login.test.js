/**
 * @description user api test
 */

const server = require('./server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// cookie
let COOKIE = ''

test('注册一个用户', async() => {
    const res = await server.post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

test('登录一个用户', async() => {
    const res = await server.post('/api/user/login')
        .send(testUser)
    expect(res.body.errno).toBe(0)
    // 获取cookie
    COOKIE = res.header['set-cookie'].join(';')
})

test('删除一个用户', async() => {
    const res = await server.post('/api/user/delect')
                .set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)  
})

test('删除之后再次查询 应该不存在', async() => {
    const res = await server.post('/api/user/isExist')
                .send({userName})
    expect(res.body.errno).not.toBe(0)  
})