const CreateDishService = require('../services/Dish/CreateDishService')
const DeleteDishService = require('../services/Dish/DeleteDishService')
const ShowDishService = require('../services/Dish/ShowDishService')
const IndexDishService = require("../services/Dish/IndexDishService")
const UpdatedDishService = require('../services/Dish/UpdatedDishService')

const DishRepository = require('../repositories/DishRepository')
const IngredientsRepository = require("../repositories/IngredientsRepository")

class DishController {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const user_id = request.user.id

        const dishRepository = new DishRepository()
        const ingredientsRepository = new IngredientsRepository()

        const createDishService = new CreateDishService(dishRepository, ingredientsRepository)

        await createDishService.execute({ name, description, price, category, ingredients, user_id })


        return response.json({ message: "Prato criado com sucesso" })

    }

    async show(request, response) {
        const { id } = request.params

        const dishRepository = new DishRepository()
        const ingredientsRepository = new IngredientsRepository()

        const showDishService = new ShowDishService(dishRepository, ingredientsRepository)

        const { dish, ingredients } = await showDishService.execute(id)

        return response.json({
            ...dish,
            ingredients
        })
    }

    async delete(request, response) {
        const { id } = request.params

        const dishRepository = new DishRepository()
        const deleteDishService = new DeleteDishService(dishRepository)

        await deleteDishService.execute(id)

        return response.json({ message: "Prato apagado com sucesso" })
    }

    async index(request, response) {
        const { name, ingredients, category } = request.query

        const dishRepository = new DishRepository()
        const ingredientsRepository = new IngredientsRepository()
        const indexDishService = new IndexDishService(dishRepository, ingredientsRepository)

        const { dishWithIngredients } = await indexDishService.execute(name, ingredients, category)

        return response.json(dishWithIngredients)
    }

    async update(request, response) {
        const { name, description, price, category, ingredients } = request.body
        const user_id = request.user.id
        const { id } = request.params

        const dishRepository = new DishRepository()
        const ingredientsRepository = new IngredientsRepository()
        const updatedDishService = new UpdatedDishService(dishRepository, ingredientsRepository)

        await updatedDishService.execute(name, description, price, category, ingredients, user_id, id)

        return response.json({ message: "Prato atualizado com sucesso" })

    }

}

module.exports = DishController