const AppError = require('../../utils/appError')

class DisabledDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute() {
        try {
            const disabledDishes = await this.DishRepository.indexDisableDish()

            return { disabledDishes }

        } catch (error) {
            throw new AppError("Não foi possível encontrar os pratos desativados.");
        }

    }
}

module.exports = DisabledDishService