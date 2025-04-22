const AppError = require('../../utils/appError')

class CreatedImageDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute(dishId, ImageDishFileName, diskStorageDish) {
        const dish = await this.DishRepository.findByDishWithId(dishId)


        if (dish.imageDish) {
            await diskStorageDish.deleteFile(dish.imageDish)
        }

        const fileName = await diskStorageDish.saveFile(ImageDishFileName)
        dish.imageDish = fileName

        try {
            await this.DishRepository.updatedDishWithImage(fileName, dishId)

        } catch (error) {
            throw new AppError("Não foi possível adicionar imagem ao prato.", 400)
        }

        return { dish }


    }
}

module.exports = CreatedImageDishService