const knex = require('../database/knex')

class DishRepository {
    async createDish(name, description, price, category, user_id) {
        const [dish_id] = await knex("dish").insert({
            name,
            description,
            price,
            category,
            user_id
        })


        return { dish_id }


    }

    async deleteDish(id) {
        await knex('dish').where({ id }).delete()
    }

    async findByDishWithId(id) {
        return await knex('dish').where({ id }).first()
    }

    async findByDish(name, category) {
        return await knex('dish')
            .orderBy("name")
            .where('name', 'like', `%${name || ''}%`)
            .where('category', 'like', `%${category || ''}%`);
    }

    async updatedDish({ name, description, price, category, id }) {

        return await knex("dish").where({ id }).update({
            name,
            description,
            price,
            category,
            updated_at: knex.fn.now()
        })
    }

    async updatedDishWithImage(imageDish, id) {

        return await knex("dish").update({
            imageDish,
            updated_at: knex.fn.now()
        }).where({ id })

    }

    async findDishToOrder(id) {
        return await knex('dish')
            .whereIn('id', id)
            .select('id', 'price')

    }


}

module.exports = DishRepository