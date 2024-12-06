const AppError = require('../../utils/appError')
const knex = require("../../database/knex")
class UpdatedDishService {
    constructor(DishRepository, IngredientsRepository) {
        this.DishRepository = DishRepository
        this.IngredientsRepository = IngredientsRepository
    }

    async execute(name, description, price, category, ingredients, user_id, id) {

        const dish = await this.DishRepository.findByDishWithId(id)
        const { role } = request.user

        if (role === 'customer') {
            throw new AppError("Você não tem permissão para isso.", 401)
        }

        if (!dish) {
            throw new AppError("Não foi possível encontrar o prato.", 401);
        }

        const dish_id = dish.id
        dish.name = name ?? dish.name
        dish.description = description ?? dish.description
        dish.price = price ?? dish.price
        dish.category = category ?? dish.category

        if (ingredients) {
            await this.IngredientsRepository.deleteIngredientsWithDishId(id)

            await this.IngredientsRepository.ingredientsInsert(user_id, dish_id, ingredients)

        }

        await this.DishRepository.updatedDish({
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category,
            id: dish_id
        })
    }
}

module.exports = UpdatedDishService