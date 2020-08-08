/**
 * @description sequelize同步数据库
 */

const seq = require('./seq')

seq.authenticate().then(res=>{
    console.log('ok')
}).catch(()=>{
    console.log('err')
})

seq.sync({
    force:true ,//同步清空表 重新创建
}).then(()=>{
    console.log('sync ok')
    process.exit()
}).catch(e=>{
    console.log(e)
})