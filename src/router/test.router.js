const KoaRouter = require('@koa/router')

const testRouter = new KoaRouter({ prefix: '/test' })

testRouter.get('/', (ctx, next) => {
  ctx.body = {
    code: 0,
    message: '测试成功'
  }
})

module.exports = testRouter