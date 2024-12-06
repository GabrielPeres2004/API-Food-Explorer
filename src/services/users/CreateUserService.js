const { hash } = require('bcryptjs')
const AppError = require('../../utils/appError')

class CreateUserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password }) {

        if (!name) {
            throw new AppError("Insira um nome.", 400)
        }

        if (!email) {
            throw new AppError("Insira um email.", 400)
        }

        const emailValidation = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!emailValidation(email)) {
            throw new AppError("Por favor, insira um e-mail válido.");
        }

        const checkUserExist = await this.userRepository.findByEmail(email)

        if (checkUserExist) {
            throw new AppError("Este email já está sendo utilizado.", 401)
        }

        if (!password) {
            throw new AppError("Insira uma senha.", 400)
        }

        if (password.length !== 6) {
            throw new AppError("A senha nova deve conter 6 dígitos.", 400)
        }

        const hashedPassword = await hash(password, 8)

        try {
            return await this.userRepository.create({ name, email, password: hashedPassword })

        } catch (error) {
            throw new AppError("Não foi possível criar o usuário.", 500)
        }

    }
}

module.exports = CreateUserService