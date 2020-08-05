const Sequelize = require('sequelize')

const seq = new Sequelize('test','root','12345678',{
    host:'127.0.0.1',
    port:'3306',
    dialect:'mysql'  
})

module.exports = seq
