const conn = require('../app/database')

class UserService {
  async create(user) {
    // 1.获取用户
    const { name, password } = user

    // 2.使用statement预处理语句
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

    // 3.执行sql语句
    const [result] = await conn.execute(statement, [name, password])
    return result
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [values] = await conn.execute(statement, [name])
    return values;
  }

  async updateUserAvatar(avatarUrl, userId) {
    const statement = 'UPDATE `user` SET avatar_url = ? WHERE id = ?;'
    const [result] = await conn.execute(statement, [avatarUrl, userId])
    
    return result
  }
}

module.exports = new UserService()