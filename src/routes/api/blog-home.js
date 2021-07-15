/**
 * @description 首页api router
 * @author shima_lee
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, image, content })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList, true)

    ctx.body = result
})

module.exports = router