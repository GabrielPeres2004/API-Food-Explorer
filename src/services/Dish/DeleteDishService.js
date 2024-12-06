const AppError = require('../../utils/appError')

class DeleteDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute(id) {
        const { role } = request.user

        if (role === 'customer') {
            throw new AppError("Você não tem permissão para isso.", 401)
        }

        try {
            await this.DishRepository.deleteDish(id)

            return

        } catch {
            throw new AppError("Não foi possível deletar o prato.", 400);
        }

    }
}

module.exports = DeleteDishService