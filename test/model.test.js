/**
 * @description user model test
 */

const { User } = require('../src/db/model/index')

test('user 模型的各个属性',()=>{
    const user = User.build({
        userName:'a23',
        password:'123456',
        nickName:'zhangsan',
        picture:'xx.png',
        city:'北京'
    })
    // 验证各个熟悉
    expect(user.userName).toBe('a23')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('zhangsan')
    expect(user.gender).toBe(3)
})