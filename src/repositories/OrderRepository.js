const knex = require("../database/knex")

class OrderRepository {
    async create({ paymentType, deliveryType, orderCompleted, payment, numberInstallments, user_id }) {
        const [order_id] = await knex('order').insert({
            paymentType,
            deliveryType,
            orderCompleted,
            payment,
            numberInstallments,
            user_id
        })

        return { order_id }
    }

    async findCustomerOrder(user_id) {
        return await knex('order').where({ user_id }).orderBy("id")
    }

    async findAllOrder() {
        return await knex('order').orderBy("id")
    }

    async findOrderWithId(id) {
        return await knex('order').where({ id })
    }

    async updateOrderStatus(id, status) {
        return await knex('order').update({
            orderCompleted: status

        }).where({ id })

    }

}

module.exports = OrderRepository