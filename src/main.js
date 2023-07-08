const app = require('./app')
const { SERVER_PORT } = require('./config/server')

// 错误处理
require('./utils/handle.error')

app.listen(SERVER_PORT, () => {
  console.log('服务器已启动~')
})
