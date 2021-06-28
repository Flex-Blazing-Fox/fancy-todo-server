const errorHandler = (err, req, res, next) => {
    let statusCode
    let error = []

    switch(err.name) {
        case 'LOGIN_FAILED' :
            statusCode = 401
            error.push("Login Gagal ! Silahkan cek email dan password")
            break
        case 'IS_NOT_LOGIN' :
            statusCode = 401
            error.push("Anda Belum Melakukan Login")
            break
        case 'INVALID_TOKEN' :
            statusCode = 401
            error.push("Invalid Access Token")
            break
        case 'USER_DATA_NOT_FOUND':
            statusCode = 404
            error.push("User Data Tidak Ditemukan")
            break;
        case 'TODO_NOT_FOUND' :
            statusCode = 404
            error.push("Todo Not Found")
            break
        case 'SequelizeValidationError' :
            statusCode = 400
            error.push(err.errors[0].message)
            breaks
        case'SequelizeUniqueConstraintError' : 
            statusCode = 400
            error.push({"message" : "Email telah terdaftar"})
            break
        default : 
            statusCode = 500
            errorr.push(err.name)
            break
    }

    res.status(statusCode).json(error)
}

module.exports = errorHandler