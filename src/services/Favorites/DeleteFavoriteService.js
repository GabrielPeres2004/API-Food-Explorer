const AppError = require('../../utils/appError')


class DeleteFavoriteService {
    constructor(FavoriteRepository, DishRepository) {
        this.FavoriteRepository = FavoriteRepository
        this.DishRepository = DishRepository
    }

    async execute(user_id, dish_id) {
        const favoriteDish = await this.FavoriteRepository.findAlreadyFavorite(user_id, dish_id)

        if (!favoriteDish) {
            throw new AppError("Não foi possível localizar o prato favorito.");
        }

        try {
            await this.FavoriteRepository.removeFavorite(favoriteDish.id)

        } catch (error) {
            throw new AppError("Não foi possível deletar o prato favorito.");
        }
    }
}

module.exports = DeleteFavoriteService