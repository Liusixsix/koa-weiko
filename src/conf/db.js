
const { isProd } = require('../utils/env')
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}
if (isProd) {
    // 线上配置
}
module.exports = {
    REDIS_CONF
}