const AppError = require('../utils/appError')

function roleToVerify(roleToVerify) {
    return (request, response, next) => {
        const { role } = request.user

        if (!roleToVerify.includes(role)) {
            throw new AppError("Unauthourized", 401);
        }

        return next()
    }
}

module.exports = roleToVerify
