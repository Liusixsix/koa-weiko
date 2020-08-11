/**
 * @description 微博数据模型
 */

const seq = require('../seq')
const { STRING,TEXT, INTEGER } = require('../type')


const Blog = seq.define('blog',{  
    content:{
        type:TEXT,
        allowNull:false,
        comment:'微博内容'
    },
    image:{
        type:STRING,
        comment:'图片地址'
    },
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户id'
    },
})

module.exports = Blog