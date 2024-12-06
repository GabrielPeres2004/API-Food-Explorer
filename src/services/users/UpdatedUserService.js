const { compare } = require("bcryptjs")
const AppError = require('../../utils/appError')


class UpdatedUserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    emailValidation = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async execute({ name, email, password, oldPassword, user_id }) {
        const user = await this.userRepository.findByUserWithId(user_id)

        if (!user) {
            throw new AppError("Usuário não encontrado.", 401)
        }

        if (email) {

            if (!this.emailValidation(email)) {
                throw new AppError("Por favor, insira um e-mail válido.", 400);
            }

            const userUpdatedWithEmail = await this.userRepository.findByEmail(email)

            if (userUpdatedWithEmail && userUpdatedWithEmail.id !== user.id) {
                throw new AppError("Este email já está em uso.", 401)
            }
        }

        user.email = email ?? user.email
        user.name = name ?? user.name


        if (!password && oldPassword) {
            console.log(oldPassword)
            throw new AppError("Insira a senha nova.", 400)
        }

        if (password && !oldPassword) {
            throw new AppError("Insira a senha antiga.", 400)
        }

        if (password && oldPassword) {

            if (password.length !== 6 && oldPassword.length !== 6) {
                throw new AppError("As senhas devem conter 6 dígitos.", 400)
            }

            if (password.length !== 6) {
                throw new AppError("A senha nova deve conter 6 dígitos.", 400)
            }

            if (oldPassword.length !== 6) {
                throw new AppError("A senha antiga deve conter 6 dígitos.", 400);
            }

            const checkOldPassword = await compare(oldPassword, user.password)

            if (!checkOldPassword) {
                throw new AppError("A senha está inválida.", 400);
            }

            user.password = await hash(password, 8)
        }

        try {
            return await this.userRepository.updatedUser({
                id: user.id,
                name: user.name,
                email: user.email,
                password
            })

        } catch (error) {
            throw new AppError("Não foi possível atualizar os dados.", 400);
        }


    }

}

module.exports = UpdatedUserService