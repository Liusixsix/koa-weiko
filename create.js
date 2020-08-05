const { Blog,User}  = require('./model')

!(async function(){
    // 创建用户
    const lisi = await User.create({
        userName:'李四',
        password:'123',
        nickName:'我是昵称'
    })
    const lisiId = lisi.dataValues.id
    console.log('lisi',lisi.dataValues)    

    // 创建博客
    const blog1 = await Blog.create({
        title:'标题1',
        content:'内容1',
        userId:lisiId
    })
    console.log(blog1.dataValues)

})()