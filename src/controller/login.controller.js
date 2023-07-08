const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController {
  sign(ctx, next) {
    // 4.颁发令牌，传入token

    // 4.1 获取用户信息
    const { id, name } = ctx.user

    // 4.2 颁发令牌token
    const payload = { id, name }

    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 24 * 60 * 60
    })

    // 4.3 返回用户信息
    ctx.body = {
      code: 0,
      data: { token, id, name }
    }
  }

  test(ctx, next) {
    ctx.body = {
      code: 0,
      message: '登陆成功可以访问资源'
    }
  }
}

module.exports = new LoginController()