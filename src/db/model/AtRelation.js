/**
 * @description at关系
 */

const seq = require('../seq')
const { STRING,TEXT, INTEGER,BOOLEAN } = require('../type')
                               

const AtRelation = seq.define('atRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    blogId:{
        type:INTEGER,
        allowNull:false,
        comment:'微博 id'        
    },
    isRead:{
        type:BOOLEAN,
        allowNull:false,
        defaultValue:false,//默认未读
        comment:'是否已读'
    }

})

module.exports = AtRelation