const CreateUserService = require('../services/users/CreateUserService')
const UpdatedUserService = require('../services/users/UpdatedUserService')
const UserRepository = require('../repositories/UserRepository')
const ValidatedUserService = require("../services/users/ValidatedUserService")

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const createUserService = new CreateUserService(userRepository)

        await createUserService.execute({ name, email, password })

        return response.json({ message: "Usuário criado com sucesso" })
    }

    async update(request, response) {
        const { name, email, password, oldPassword } = request.body
        const user_id = request.user.id

        const userRepository = new UserRepository()
        const updatedUserService = new UpdatedUserService(userRepository)


        await updatedUserService.execute({ name, email, password, oldPassword, user_id })


        return response.json({ message: "Usuário atualizado com sucesso" })

    }

    async index(request, response) {
        const user_id = request.user.id

        const userRepository = new UserRepository()
        const validatedUserService = new ValidatedUserService(userRepository)

        const { checkUserExists } = await validatedUserService.execute({ user_id })

        return response.status(201).json(checkUserExists);


    }
}


module.exports = UserController