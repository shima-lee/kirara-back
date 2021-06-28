/**
 * @description sequelize 同步
 * @author shima_lee
 */

const seq = require('./seq')

require('./model/index')


// pre-lint test
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(err => {
    console.log(err)
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})