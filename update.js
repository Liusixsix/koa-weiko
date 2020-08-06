const { User} = require('./model')

!(async ()=>{
    
    const updateRes = await User.update({
        nickName:'李四222'
    },{
        where:{
            userName:'李四'
        }
    })
    console.log('update-->',updateRes[0]>0)


})()