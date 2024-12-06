const AppError = require('../../utils/appError')
class ShowDishService {
    constructor(DishRepository, IngredientsRepository) {
        this.DishRepository = DishRepository
        this.IngredientsRepository = IngredientsRepository
    }

    async execute(id) {

        try {
            const dish = await this.DishRepository.findByDishWithId(id)
            const ingredients = await this.IngredientsRepository.findByingredientshWithId(id)

            if (!dish) {
                throw new AppError("Não foi possível encontrar o prato.", 401)
            }

            if (ingredients.lenght === 0) {
                throw new AppError("Não foi possível encontrar os ingredientes.", 401)
            }

            return { dish, ingredients }
        } catch (error) {
            throw new AppError("Não foi possível trazer informações do prato.", 400);
        }

    }
}

module.exports = ShowDishService