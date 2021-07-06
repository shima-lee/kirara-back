/**
 * @description 失败信息合集
 * @author shima_lee
 */

module.exports = {
    registerUserNameExist: {
        errno: 10001,
        message: '用户名已存在'
    },
    registerFailInfo: {
        errno: 10002,
        message: '注册失败请重试'
    },
    registerUserNameNotExist: {
        errno: 10003,
        message: '用户名未存在'
    },
    jsonSchemaFailInfo: {
        errno: 10004,
        message: '数据格式校验错误'
    },
    loginFailInfo: {
        errno: 10005,
        message: '登录失败'
    },
    loginCheckFailInfo: {
        errno: 10006,
        message: '您尚未登录'
    },
    deleteFailInfo: {
        errno: 10007,
        message: '删除失败'
    },
    uploadFileSizeFailInfo: {
        errno: 10008,
        message: '上传文件体积过大'
    },
    changeInfoFailInfo: {
        errno: 10009,
        message: '修改基本信息失败'
    },
    changePasswordFailInfo: {
        errno:10010,
        message: '修改密码失败'
    }
}