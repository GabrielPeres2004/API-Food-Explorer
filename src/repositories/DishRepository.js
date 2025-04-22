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

    async findByDishWithUser_Id(user_id) {
        return await knex('dish').where({ user_id }).first()
    }

    async findByDish(name, userRole) {
        let query = knex('dish')
            .orderBy("name")
            .andWhereRaw('LOWER(name) LIKE ?', [`%${(name || '').toLowerCase()}%`]);

        if (userRole !== 'admin') {
            query = query.where('active', true);
        }

        return await query;
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


    async activateDish(id) {
        await knex('dish').where({ id }).update({
            active: true,
            updated_at: knex.fn.now()
        })
    }


    async indexDisableDish() {
        return await knex('dish')
            .where('active', false)
            .orderBy('name')
    }

}

module.exports = DishRepository