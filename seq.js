const Sequelize = require('sequelize')

const conf = {
    host:'127.0.0.1',
    port:'3306',
    dialect:'mysql'
}
// 线上环境使用连接池
// conf.pool= {
//     max:5,//连接池最大的连接数量
//     min:0,//最小
//     idle:10000,//一个连接池10s以内没被使用 释放
// }

const seq = new Sequelize('test','root','12345678',conf)

module.exports = seq
