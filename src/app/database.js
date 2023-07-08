const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: '124.222.245.238',
  port: 3306,
  user: 'root',
  password: 'coderyxy',
  database: 'coderhub',
  connectionLimit: 5
})

// 2.获取连接是否成功
connectionPool.getConnection((err, conn) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取连接失败~', err)
    return
  }

  // 2.获取connection,尝试与数据库建立一下连接
  conn.connect(err => {
    if (err) {
      console.log('和数据库建立连接失败', err)
    } else {
      console.log('数据库连接成功，可以操作数据库')
    }
  })
})

// 3.获取连接池中的连接对象。并且是可以返回Promise的
const conn = connectionPool.promise()

module.exports = conn