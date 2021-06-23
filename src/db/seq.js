/**
 * @description 实例化sequelize
 */

const { MYSQL_CONF } = require('../conf/db')
const { host, database, user, password } = MYSQL_CONF
const Sequelize = require('sequelize')

const conf = {
    host: host,
    dialect: 'mysql'
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq