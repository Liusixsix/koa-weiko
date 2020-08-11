/**
 * @description 数据模型 入口文件
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User,{
    foreignKey:'userId'
})

// User.hasMany(Blog,{
//     foreignKey:'userId'
// })
module.exports = {
    User,Blog
}