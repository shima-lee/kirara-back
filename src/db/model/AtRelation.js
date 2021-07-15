/**
 * @description @ 用户关系数据模型
 * @author shima_lee
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户Id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读'
    },
})

module.exports = AtRelation