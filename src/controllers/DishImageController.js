const DiskStorageDish = require('../provider/DiskStorageDish')

const UpdatedImageDishService = require('../services/Dish/UpdatedImageDishService')
const CreatedImageDishService = require("../services/Dish/CreatedImageDishService")
const DishRepository = require("../repositories/DishRepository")

class ImageDishController {

    async create(request, response) {
        const { dishId } = request.body

        const ImageDishFileName = request.file.filename
        const diskStorageDish = new DiskStorageDish()

        const dishRepository = new DishRepository()
        const createdImageDishService = new CreatedImageDishService(dishRepository)

        const { dish } = await createdImageDishService.execute(dishId, ImageDishFileName, diskStorageDish)

        return response.json(dish)

    }

    async update(request, response) {
        const { id } = request.params
        const ImageDishFileName = request.file.filename
        const diskStorageDish = new DiskStorageDish()

        const dishRepository = new DishRepository()
        const updatedImageDishService = new UpdatedImageDishService(dishRepository)

        const { dish } = await updatedImageDishService.execute(id, ImageDishFileName, diskStorageDish)

        return response.json(dish)

    }

}

module.exports = ImageDishController