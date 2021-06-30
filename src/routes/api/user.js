/**
 * @description user Api 路由
 * @author shima_lee
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurrentUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')


router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })

})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    const ress = await isExist(userName)
    ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        //! 测试环境下，测试账号登录后删除自己
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurrentUser(userName)

    }
})

module.exports = router