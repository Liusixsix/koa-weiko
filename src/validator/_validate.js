/**
 * @description 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv()


/**
 * 
 * @param {Object} schema 校验规则 
 * @param {*Object data 校验的数据 
 */
function validate(schema,data={}){
    const valid = ajv.validate(schema,data)
    if(!valid){
        return ajv.errors[0]
    }
}

module.exports = validate