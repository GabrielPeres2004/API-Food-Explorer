const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const authConfig = require('../../config/authConfig')
const AppError = require('../../utils/appError')
const { response } = require('express')

class CreateSessionsServices {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository
    }

    async execute({ email, password }) {

        if (!email) {
            throw new AppError("Insira um email."), 400;
        }

        if (!password) {
            throw new AppError("Insira uma senha."), 400;
        }

        const user = await this.sessionRepository.findByEmail(email)

        if (!user) {
            throw new AppError("E-mail ou senha estão incorretos."), 401;
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("E-mail ou senha estão incorretos."), 401;
        }

        const { secret, expiresIn } = authConfig.JWT

        const token = sign({ role: user.role }, secret, {
            subject: String(user.id),
            expiresIn

        })

        delete user.password

        response.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 1000
        })

        return { token, user }

    }

}

module.exports = CreateSessionsServices