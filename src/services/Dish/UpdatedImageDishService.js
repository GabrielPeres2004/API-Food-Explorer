const AppError = require('../../utils/appError')

class UpdatedImageDishService {
    constructor(DishRepository) {
        this.DishRepository = DishRepository
    }

    async execute(id, ImageDishFileName, diskStorageDish) {
        const dish = await this.DishRepository.findByDishWithId(id)

        if (!dish) {
            throw new AppError("Não foi possível encontrar o prato.", 401)
        }

        if (dish.imageDish) {
            await diskStorageDish.deleteFile(dish.imageDish)
        }

        const fileName = await diskStorageDish.saveFile(ImageDishFileName)
        dish.imageDish = fileName


        try {
            await this.DishRepository.updatedDishWithImage(fileName, id)

        } catch (error) {
            throw new AppError("Não foi possível adicionar imagem ao prato.", 400)
        }

        return { dish }


    }
}

module.exports = UpdatedImageDishService