/**
 * @description server test
 * @author shima_lee
 */
const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)