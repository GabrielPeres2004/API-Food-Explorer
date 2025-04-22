const AppError = require('../../utils/appError')

class DeleteDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute(id) {
        const dish = await this.DishRepository.findByDishWithId(id)

        if (!dish) {
            throw new AppError("Não foi possível encontrar o prato.", 401);
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