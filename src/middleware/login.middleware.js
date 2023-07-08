const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION
} = require('../config/error')

const userService = require('../service/user.service')
const { md5Password } = require('../utils/handle.password')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../config/screct')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    // 以前我疑惑为什么这里加return其实不缺这个错误信息的打印，这个return是让程序停到这
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.查询该用户是否存在数据库中
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 3.查询数据库中密码和用户名是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }

  // 4.将user信息保存到next中
  ctx.user = user

  await next();
}

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  try {
    // 2.获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    // 3.将token中信息保留下来
    ctx.user = result

    // 4.执行下一个中间件
    await next()
  } catch (err) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}