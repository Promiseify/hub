const KoaRouter = require('@koa/router')
// 颁发token
const { sign, test } = require('../controller/login.controller')
// 验证登录身份
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)
loginRouter.post('/test', verifyAuth, test)

module.exports = loginRouter