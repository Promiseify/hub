const KoaRouter = require('@koa/router')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { create, showAvatarImage } = require('../controller/user.controller')

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 2.定义路由中映射
// 2.1用户注册接口
userRouter.post('/register', handlePassword, verifyUser, create)

// 2.2为用户提供头像
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter
