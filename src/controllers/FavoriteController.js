const AppError = require('../utils/appError')
const knex = require('../database/knex');

const FavoriteRepository = require("../repositories/FavoriteRepository")
const DishRepository = require('../repositories/DishRepository')

const CreateFavoriteService = require("../services/Favorites/CreateFavoriteService")
const DeleteFavoriteService = require('../services/Favorites/DeleteFavoriteService')
const IndexFavoriteService = require('../services/Favorites/IndexFavoriteService')

class FavoriteController {

    async create(request, response) {
        const user_id = request.user.id
        const { dish_id } = request.params

        const favoriteRepository = new FavoriteRepository()
        const dishRepository = new DishRepository()
        const createFavoriteService = new CreateFavoriteService(favoriteRepository, dishRepository)

        await createFavoriteService.execute(user_id, dish_id)

        return response.json({ message: "Prato favoritado com sucesso" })
    }


    async delete(request, response) {
        const user_id = request.user.id;
        const { dish_id } = request.params;


        const favoriteRepository = new FavoriteRepository()
        const dishRepository = new DishRepository()
        const deleteFavoriteService = new DeleteFavoriteService(favoriteRepository, dishRepository)

        await deleteFavoriteService.execute(user_id, dish_id)

        return response.json({ message: "Prato favorito deletado com sucesso" });
    }

    async index(request, response) {
        const user_id = request.user.id;


        const favoriteRepository = new FavoriteRepository()
        const indexFavoriteService = new IndexFavoriteService(favoriteRepository)

        const { findFavoritesWithUserId } = await indexFavoriteService.execute(user_id)


        return response.json(findFavoritesWithUserId)

    }

}


module.exports = FavoriteController