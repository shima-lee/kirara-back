/**
 * @description @ 用户关系 service
 * @author shima_lee
 */
const { AtRelation } =require('../db/model/index.js')

/**
 * 创建微博 @ 用户的关系
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId,
    })

    return result.dataValues
}

module.exports = {
    createAtRelation
}