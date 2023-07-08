const momentService = require("../service/moment.service")

class MomentController {
  async create(ctx, next) {
    // 1.获取动态中的内容
    const { content } = ctx.request.body

    // 动态由谁发布
    const { id, name } = ctx.user
    
    console.log(content, id, name)

    // 3.将动态相关数据保存到数据库
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '创建用户动态成功',
      data: result
    }
  }
}

module.exports = new MomentController()