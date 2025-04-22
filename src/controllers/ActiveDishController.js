const ActivateDishService = require('../services/Dish/ActivateDishService')
const DishRepository = require('../repositories/DishRepository')

class ActiveDishController {

    async update(request, response) {
        const { id } = request.params

        const dishRepository = new DishRepository()
        const activateDishService = new ActivateDishService(dishRepository)

        await activateDishService.execute(id)


        return response.json({ message: "Prato ativado com sucesso." })
    }


}

module.exports = ActiveDishController