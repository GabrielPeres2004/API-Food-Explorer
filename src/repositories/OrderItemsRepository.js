const knex = require('../database/knex')

class OrderItemsRepository {
    async create(order_id, user_id, OrderItems) {
        const insertItemsOrder = OrderItems.map(item => {
            return {
                order_id,
                user_id,
                dish_id: item.dish_id,
                count: item.count
            }
        })

        await knex('orderItems').insert(insertItemsOrder)
    }

    async findCustomerItemsOrder(user_id) {
        return await knex('orderItems').where({ user_id })
    }

    async findAllItemsOrder() {
        return await knex('orderItems')
    }

    async findByItemsOrderWithOrderId(id) {
        return await knex('orderItems').where({ order_id: id })

    }

}

module.exports = OrderItemsRepository