/**
 * @description user 数据校验
 */

const validate = require('./_validate')

const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        gender: {
            type: 'string',
            minimum: 1,
            maximum: 3
        },
        picture:{
            type:'string'
        }
    }
}

/**
 * 校验用户数据格式 
 * @param {Object} data  校验的数据
 */
function userValidate(data={}){
    return validate(SCHEMA,data)
}

module.exports = userValidate