const conn = require('../app/database')

class MomentService {
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    const [result] = await conn.execute(statement, [content, userId])
    return result
  }
}

module.exports = new MomentService()