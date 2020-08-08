/**
 * @description jest test
 */
const server = require('./server')

test('json 接口返回数据',async()=>{
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title:'zhelishi json'
    })
})