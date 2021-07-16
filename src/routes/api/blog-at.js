/**
 * @description 个人主页 API路由
 * @author shima_lee
 */

const router = require('koa-router')()
const{ loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
const { getAtMeBlogList } = require('../../controller/blog-at')

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo
    const result = await getAtMeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList, true)

    ctx.body = result
})

module.exports = router
