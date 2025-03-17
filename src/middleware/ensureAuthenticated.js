const authConfig = require('../config/authConfig')
const AppError = require('../utils/appError');
const { verify } = require('jsonwebtoken');

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers


    if (!authHeader.cookie) {
        throw new AppError("JWT token não informado", 401);
    }

    const [, token] = authHeader.cookie.split("token=")

    try {
        const { role, sub: user_id } = verify(token, authConfig.JWT.secret)

        request.user = {
            id: Number(user_id),
            role
        }

        return next()

    } catch (error) {
        throw new AppError("Seu token JWT expirou.", 401);
    }
}

module.exports = ensureAuthenticated