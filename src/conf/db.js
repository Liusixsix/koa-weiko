
const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'test',

}
if (isProd) {
    // 线上配置
}
module.exports = {
    REDIS_CONF, MYSQL_CONF
}
