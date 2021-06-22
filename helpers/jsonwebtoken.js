const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'arjun'

const token = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET)
}

const decode = (token) => {
  return jwt.verify(token, TOKEN_SECRET)
}

module.exports = {
  token,
  decode
}