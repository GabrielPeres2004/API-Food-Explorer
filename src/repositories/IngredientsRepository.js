const knex = require('../database/knex')
class IngredientsRepository {
    async findByingredientshWithId(id) {
        return await knex('ingredients').where({ dish_id: id }).orderBy("name")
    }


    async findByDishWithIngredients(filterIngredients) {

        return await knex('ingredients')
            .select([
                "dish.id",
                "dish.name",
                "dish.user_id"
            ])
            .innerJoin("dish", "dish.id", "ingredients.dish_id")
            .where(function () {
                filterIngredients.forEach(ingredient => {
                    this.orWhere("ingredients.name", "like", `%${ingredient.trim()}%`);
                });
            })
            .orderBy('dish.name')
            .groupBy('dish.id')
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