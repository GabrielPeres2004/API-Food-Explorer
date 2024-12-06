const knex = require('../database/knex')

class FavoriteRepository {

    async create(user_id, dish_id) {
        return await knex('favoriteDishes').insert({
            user_id,
            dish_id
        })
    }

    async findAlreadyFavorite(user_id, dish_id) {
        const favoriteDish = await knex('favoriteDishes')
            .where({ user_id, dish_id })
            .first();

        return { favoriteDish }

    }

    async removeFavorite(id) {
        return await knex("favoriteDishes")
            .where({ id })
            .delete();
    }

    async findFavoritesWithUserId(user_id) {
        return await knex("favoriteDishes")
            .where({ user_id })
    }

}

module.exports = FavoriteRepository