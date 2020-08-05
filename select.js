const { Blog,User}  = require('./model')

!(async function(){
    // 查询一条记录
    const lisi  = await User.findOne({
        where:{
            userName:'李四'
        }
    })
    // console.log('lisi',lisi.dataValues)


    // 查询特定的列
    const zhangsanName = await User.findOne({
        attributes:['userName','nickName'],
        where:{
            userName:'李四'
        }
    })
    console.log('zhangsanName',zhangsanName.dataValues)
})()