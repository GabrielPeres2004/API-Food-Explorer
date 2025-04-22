const AppError = require('../../utils/appError')

class IndexFavoriteService {
    constructor(FavoriteRepository) {
        this.FavoriteRepository = FavoriteRepository
    }

    async execute(user_id) {
        let findFavoritesWithUserId

        try {
            findFavoritesWithUserId = await this.FavoriteRepository.findFavoritesWithUserId(user_id)

        } catch (error) {
            throw new AppError("Não foi possível mostrar o prato favorito.");
        }

        return findFavoritesWithUserId

    }
}

module.exports = IndexFavoriteService