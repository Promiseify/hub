const conn = require('../app/database')

class FileService {
  async create(filename, mimetype, size, user_id) {
    const statement = 'INSERT INTO `avatar` (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await conn.execute(statement, [filename, mimetype, size, user_id])
    return result
  }

  async queryAvatarWithUserId(userId) {
    const statement = 'SELECT * from `avatar` where user_id = ?;'
    const [result] = await conn.execute(statement, [userId])
    // 返回最后一张图片的信息
    return result.pop()
  }
}

module.exports = new FileService()