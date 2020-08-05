const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建user模型 
const User = seq.define('user',{
    userName:{
        type: Sequelize.STRING,//varvchar(255)
        allowNull:false,//是否为空
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    },
    nickName:{
        type: Sequelize.STRING,
        comment:'昵称' ,//注释
    }
})

const Blog = seq.define('blog',{
    title:{
        type:Sequelize.STRING,
        allowNull:false,//是否为空
    },
    content:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

// 外键关联
Blog.belongsTo(User,{
    // 创建外键 blog.userId  -> User.id
    foreignKey:'userId'
})

module.exports = {
    User,Blog
}