const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')

const {
  UPLOAD_PATH
} = require('../config/path')

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递信息
    const user = ctx.request.body

    // 2.将user信息存储到数据库中
    const result = await userService.create(user)

    // 3.查看存储的结果，并告知前端创建成功
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }

  async showAvatarImage(ctx, next) {
    // 1.获取user_id
    // 这里是通过/avatar/:userId 记录到params中
    const { userId } = ctx.params

    // 2.获取user对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)

    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    // 这里必须设置返回流的类型，才能让浏览器识别到当前图片
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()