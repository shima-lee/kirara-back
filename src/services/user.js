/**
 * @description user services
 * @author shima_lee
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')


/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }

    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attribute:['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if(result=== null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickname  
 */
async function createUser({ userName, password, gender = 3, nickname}) {
    const result = await User.create({
        userName,
        password,
        nickname: nickname ? nickname : userName,
        gender
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    //! result返回删除行数
    return result > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}