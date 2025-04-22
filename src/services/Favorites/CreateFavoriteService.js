const AppError = require('../../utils/appError')

class CreateFavoriteService {
    constructor(FavoriteRepository, DishRepository) {
        this.FavoriteRepository = FavoriteRepository
        this.DishRepository = DishRepository
    }

    async execute(user_id, dish_id) {
        if (!user_id) {
            throw new AppError("Apenas usuários autenticados têm permissão.", 401);
        }

        if (!dish_id) {
            throw new AppError("Não foi possível encontrar o prato.", 401);
        }

        const dishExists = await this.DishRepository.findByDishWithId(dish_id)

        if (!dishExists) {
            throw new AppError("O prato informado não existe.", 404);
        }

        const alreadyFavorite = await this.FavoriteRepository.findAlreadyFavorite(user_id, dish_id)

        if (alreadyFavorite) {
            throw new AppError("Este prato já está na sua lista de favoritos.", 400);
        }

        try {

            await this.FavoriteRepository.create(user_id, dish_id)

        } catch (error) {
            throw new AppError("Não foi possível favoritar o prato.", 401);
        }

    }

}

module.exports = CreateFavoriteService