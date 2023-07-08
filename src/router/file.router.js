const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const { create } = require('../controller/file.controller')

const fileRouter = new KoaRouter({ prefix: '/file' })

// file/avatar => 上传头像
fileRouter.post('/avatar',verifyAuth , handleAvatar, create)

fileRouter.get('/test', verifyAuth, (ctx, next) => {
  ctx.body = '测试成功'
})

module.exports = fileRouter