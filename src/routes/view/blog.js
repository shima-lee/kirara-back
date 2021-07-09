/**
 * @description view 路由
 * @author shima_lee
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')


// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})


// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    console.log(userName)
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 当前登录用户信息
    const myUserInfo = ctx.session.userInfo
    const { userName: myUserName } = myUserInfo

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    // 判断是否为当前用户
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        const existResult = await isExist(curUserName)
        // 用户不存在
        if (existResult !== 0) {
            return
        }
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    // controller
    const result = await getProfileBlogList(curUserName, 0)

    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router