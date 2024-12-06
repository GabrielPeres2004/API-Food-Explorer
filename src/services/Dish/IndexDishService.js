const knex = require("../../database/knex")
const AppError = require('../../utils/appError')


class IndexDishService {
    constructor(DishRepository, IngredientsRepository) {
        this.DishRepository = DishRepository
        this.IngredientsRepository = IngredientsRepository
    }

    async execute(name, ingredients, category) {
        let dish

        if (ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredients => ingredients.trim())

            dish = await this.IngredientsRepository.findByDishWithIngredients(filterIngredients)

        } else {
            dish = await this.DishRepository.findByDish(name, category)
        }

        const ingredientsDish = await this.IngredientsRepository.findIngredientsAndOrderByName()

        const dishWithIngredients = dish.map(dish => {
            const dishIngredients = ingredientsDish.filter(ingredient => ingredient.dish_id === dish.id)
            return {
                ...dish,
                dishIngredients
            }
        })

        return { dishWithIngredients }
    }
}

module.exports = IndexDishService