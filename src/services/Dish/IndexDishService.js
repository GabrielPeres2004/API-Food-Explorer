class IndexDishService {
    constructor(DishRepository, IngredientsRepository) {
        this.DishRepository = DishRepository
        this.IngredientsRepository = IngredientsRepository
    }

    async execute(name, userRole) {
        const dish = await this.DishRepository.findByDish(name, userRole)

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
