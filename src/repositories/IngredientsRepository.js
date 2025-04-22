const knex = require('../database/knex')
class IngredientsRepository {
    async findByingredientshWithId(id) {
        return await knex('ingredients').where({ dish_id: id }).orderBy("name")
    }

    async ingredientsInsert(user_id, dish_id, ingredients) {

        const ingredientesInsert = ingredients.map(name => {
            return {
                dish_id,
                user_id,
                name
            }
        })

        await knex('ingredients').insert(ingredientesInsert)

        return

    }

    async findIngredientsAndOrderByName() {
        return await knex('ingredients').orderBy("name")
    }

    async deleteIngredientsWithDishId(id) {
        return await knex("ingredients").where({ dish_id: id }).delete()
    }

}


module.exports = IngredientsRepository