/**
 * @description sequelize同步数据库
 */

const seq = require('./seq')
require('./model')
seq.authenticate().then(res => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

seq.sync({
    force: SVGComponentTransferFunctionElement,//同步清空表 重新创建
}).then(() => {
    console.log('sync ok')
    process.exit()
}).catch(e => {
    console.log(e)
})

