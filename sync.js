const seq = require('./seq')

require('./model')

seq.authenticate().then(res=>{
    console.log('ok')
}).catch(()=>{
    console.log('err')
})

seq.sync({
    force:true
}).then(()=>{
    console.log('sync ok')
    process.exit()
}).catch(e=>{
    console.log(e)
})