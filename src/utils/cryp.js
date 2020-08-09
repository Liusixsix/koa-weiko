/**
 * @description 加密方法
 */

const crypto = require('crypto')


// 秘钥
const CRYPTO_KEY = 'sb123'

/**
 * md5加密
 * @param {string} content 明文
 */
function _md5(content){
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content){
    const str = `password=${content}&key=${CRYPTO_KEY}`
    return _md5(str) 
}

module.exports = {
    doCrypto
}