const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/moment.controller')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 编写接口
momentRouter.post('/', verifyAuth, create)

module.exports = momentRouter