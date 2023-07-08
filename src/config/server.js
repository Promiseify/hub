const dotenv = require("dotenv")

dotenv.config()

const { SERVER_HOST, SERVER_PORT } = process.env

module.exports = {
  SERVER_HOST,
  SERVER_PORT
}