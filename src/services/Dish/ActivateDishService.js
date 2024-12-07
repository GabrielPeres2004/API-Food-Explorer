const AppError = require('../../utils/appError')
class ActivateDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute(id) {

        try {
            await this.DishRepository.activateDish(id)

        } catch (error) {
            throw new AppError("Não foi possível ativar o prato.");
        }

    }
}

module.exports = ActivateDishService