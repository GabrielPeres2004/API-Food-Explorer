const AppError = require('../../utils/appError')

class CreateDishService {
    constructor(DishRepository, IngredientsRepository) {
        this.DishRepository = DishRepository
        this.IngredientsRepository = IngredientsRepository
    }

    async execute({ name, description, price, category, ingredients, user_id }) {

        if (!name) {
            throw new AppError("Insira o nome do prato.", 400);
        }

        if (!description) {
            throw new AppError("Insira uma descrição.", 400);
        }

        if (!price) {
            throw new AppError("Insira um preço.", 400);
        }

        if (!category) {
            throw new AppError("Escolha uma categoria.", 400);
        }

        if (!ingredients || ingredients.length === 0) {
            throw new AppError("Insira os ingredientes.", 400)
        }


        try {
            const { dish_id } = await this.DishRepository.createDish(name, description, price, category, user_id)

            await this.IngredientsRepository.ingredientsInsert(user_id, dish_id, ingredients)

        } catch (error) {
            console.log(error)
            throw new AppError("Não foi possível criar o prato.", 400);
        }

        return

    }
}


module.exports = CreateDishService