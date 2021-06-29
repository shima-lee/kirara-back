/**
 * @description user Api 路由
 * @author shima_lee
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')


router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })

})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    const ress = await isExist(userName)
    console.log('res=',ress)
    ctx.body = await isExist(userName)
})

module.exports = router