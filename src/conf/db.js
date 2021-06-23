// const { isprod } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
}

let MySQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'kirara'
}

module.exports = { 
    REDIS_CONF,
    MYSQL_CONF 
}