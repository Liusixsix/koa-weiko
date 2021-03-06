/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constrant')

/**
 * 
 * @param {Object} obj 用户对象 
 */
function _formatUserPictuce(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化微博内容
 * @param {object} obj 
 */
function _formatContent(obj){
    obj.contentFormat = obj.contentFormat
    obj.contentFormat = obj.contentFormat.replace(
        /@(.+?)\s-\s(\w+?)\b/g,
        (matchStr,nickName,userName)=>{
            return `<a href='/profile/${userName}'>${nickName}</a>`
        }
    )
    return obj
}

/**
 * 
 * @param {Array|Object} list 用户列表或者单个用户对象 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        // 数组 用户列表
        return list.map(_formatUserPictuce)
    }
    // 单个对象

    return _formatUserPictuce(list)
}

module.exports = {
    formatUser
}