/**
 * @description sequelize实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

// test下 不打印sql语句
if (isTest) {
    conf.logging = ()=>{}
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5,//连接池最大的连接数量
        min: 0,//最小
        idle: 10000,//一个连接池10s以内没被使用 释放
    }
}


const seq = new Sequelize(database, user, password, conf)

module.exports = seq