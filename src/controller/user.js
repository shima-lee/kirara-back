/**
 * @description user controller
 * @author shima_lee
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExist, registerUserNameExist, registerFailInfo, loginFailInfo, deleteFailInfo, changeInfoFailInfo, changePasswordFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExist)
    }
    // 统一返回格式
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1、男 2、女 3、保密）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExist)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })

        return new SuccessModel({message: '注册成功'})
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 *  登录
 * @param {Object} ctx koa2 ctx
 * @param {String} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    //获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))

    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }

    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {*} userName 
 */
async function deleteCurrentUser(userName) {
    const result = deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }

    return new ErrorModel(deleteFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx 
 * @param {string} nickname 
 * @param {string} city 
 * @param {string} picture 
 */
async function changeInfo(ctx, {nickname, city, picture}) {
    const { userName } = ctx.session.userInfo
    if (!nickname) {
        nickname = userName
    }
    console.log(nickname, city, picture)
    //service
    const result = updateUser(
        {
            newNickname: nickname,
            newCity: city,
            newPicture: picture
        },
        { 
            userName 
        }
    )
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickname,
            city,
            picture
        })
        return new SuccessModel()
    }

    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser({ 
        newPassword: doCrypto(newPassword)
    },
    {
        userName,
        password: doCrypto(password)
    }
    )

    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)

}

/**
 * 退出登录
 * @param {Object} ctx 
 * @returns 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser,
    changeInfo,
    changePassword,
    logout
}