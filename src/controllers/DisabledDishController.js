const knex = require('../database/knex')

const DisableDishService = require('../services/Dish/DisableDishService')
const DishRepository = require('../repositories/DishRepository')

class DisabledDishController {

    async index(request, response) {

        const dishRepository = new DishRepository()
        const disableDishService = new DisableDishService(dishRepository)

        const { disabledDishes } = await disableDishService.execute()

        return response.json(disabledDishes);
    }

    async update(request, response) {
        const { id } = request.params

        await knex('dish').where({ id }).update({
            active: false,
            updated_at: knex.fn.now()
        })


        return response.json({ message: "Prato desativado com sucesso." })
    }


}

module.exports = DisabledDishController