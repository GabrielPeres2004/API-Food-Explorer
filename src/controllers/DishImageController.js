const DiskStorageDish = require('../provider/DiskStorageDish')
const UpdatedImageDishService = require('../services/Dish/UpdatedImageDishService')
const DishRepository = require("../repositories/DishRepository")

class ImageDishController {
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