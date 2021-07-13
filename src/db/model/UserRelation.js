/**
 * @description 用户关系数据模型
 * @author shima_lee
 */

const seq = require('../seq')
const { INTEGER } = require('../types')


const UserRelation =seq.define('UserRelation', {
    userId:{
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户id'
    }
})

module.exports = UserRelation