/**
 * @description 数据模型 入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const AtRelation = require('./AtRelation')
const UserRelation = require('./userRelation')
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation,{
    foreignKey:'userId',
    targetKey:'followerId'
})

Blog.hasMany(AtRelation,{
    foreignKey:'blogId'
})

module.exports = {
    User, Blog, UserRelation,UserRelation
}