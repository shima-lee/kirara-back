/**
 * @description user Api 路由
 * @author shima_lee
 */

const router = require('koa-router')()

router.prefix('/api/user')

router.post('/register', async (req, res) => {

})

router.post('isExist', async (req, res) => {

})

module.exports = router