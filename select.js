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
    // console.log('zhangsanName',zhangsanName.dataValues)


    // 查询一个列表
    const zhangsanBlogList = await Blog.findAll({
        where:{
            userId:1
        },
        order:[
            ['id','desc'],
        ]
    })
    console.log('zhangsanBlogList',
    zhangsanBlogList.map(blog=>blog.dataValues)
    )

})()