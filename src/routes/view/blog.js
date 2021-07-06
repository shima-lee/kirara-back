/**
 * @description view 路由
 * @author shima_lee
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')


router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router