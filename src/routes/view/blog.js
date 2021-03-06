/**
 * @description view 路由
 * @author shima_lee
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollower } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blog-at')


// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, userList:fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollower(userId)
    const { count: followersCount, followersList } = followersResult.data

    // 获取at数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount} = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
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
        console.log(existResult)
        // 用户不存在
        if (existResult.errno !== 0) {
            return
        }
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    // controller
    const result = await getProfileBlogList(curUserName, 0)

    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    // controller
    const fansResult = await getFans(curUserInfo.id)
    const { count: fanscount, userList: fansList  } = fansResult.data

    // 获取关注人列表
    // controller
    const followersResult = await getFollower(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data

    // 获取at数量
    const atCountResult = await getAtMeCount(myUserInfo.id)
    const { count: atCount} = atCountResult.data

    // 判断我是否关注
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    console.log('followersList', followersList)

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
            isMe,
            fansData: {
                count: fanscount,
                list: fansList
                
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount,
            amIFollowed
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    // 获取at数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    // 获取第一页列表
    const result = await getAtMeBlogList(userId)
    const { count, isEmpty, pageSize, blogList, pageIndex } = result.data
    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            pageSize,
            pageIndex,
            blogList,
            count
        }
    })

    // 标记为已读
    if (atCount > 0) {
        await markAsRead(userId)
    }
})

module.exports = router