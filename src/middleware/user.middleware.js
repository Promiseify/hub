const userService = require('../service/user.service')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error')
const { md5Password } = require('../utils/handle.password')

const verifyUser = async (ctx, next) => {
  // 1.获取用户传递信息
  const user = ctx.request.body
    
  // 2.验证客户端传递的user是否可以保存到数据库中
  // 2.1 验证用户名和密码是否为空
  const { name, password } = user
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx) 
  }

  // 2.2 判断输入的用户名是否已经存在
  const users = await userService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx) 
  }

  // 3.执行下一中间件
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}