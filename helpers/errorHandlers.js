const errorHandlers = (err, req, res, next) => {
  let statusCode
  let message = []

  switch (err.name) {
    case 'UniqueEmailError':
      statusCode = 400
      message = 'email already exists'
      break
    case 'IncorrectCredentialsError':
      statusCode = 400
      message = 'email or password is wrong'
      break
    case 'SequelizeValidationError':
      statusCode = 400
      message = err.message.split('\n')
      break
    case 'AuthenticationError':
      statusCode = 401
      message = 'invalid access token, put your access token in headers, named token'
      break
    case 'MissingAccessTokenError':
      statusCode = 401
      message = 'Please provide access token'
      break
    case 'ForbiddenError':
      statusCode = 403
      message = 'FORBIDDEN'
      break
    case 'NotFoundError':
      statusCode = 404
      message = 'todo not found'
      break
    default:
      statusCode = 500
      message = 'Internal server error'
      break
  }

  res.status(statusCode).json({ err: message })
}

module.exports = errorHandlers