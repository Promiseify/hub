const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {
  SERVER_HOST, SERVER_PORT
} = require('../config/server')

class FileController {
  async create(ctx, next) {
    // 1.获取上传文件的信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user

    const result = await fileService.create(filename, mimetype, size, id)

    // 3.将保存的头像的地址信息保存在user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)
    // 单个文件是在ctx.request.file里
    // 多个文件是在ctx.request.files里
    ctx.body = {
      code: 0,
      message: '文件上传成功',
      data: avatarUrl
    }
  }
}

module.exports = new FileController()