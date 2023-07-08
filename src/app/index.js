const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

// 1.创建app
const app = new Koa()

// 2.对app使用中间件
// 使用json解析的中间件
app.use(bodyParser()) // 可以处理json数据和urlencoded数据
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())

// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())

registerRouters(app)

// 3.将app导出
module.exports = app