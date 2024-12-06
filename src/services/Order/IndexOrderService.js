const AppError = require('../../utils/appError')

class IndexOrderService {
    constructor(OrderRepository, OrderItemsRepository) {
        this.OrderRepository = OrderRepository
        this.OrderItemsRepository = OrderItemsRepository
    }

    async execute(role, user_id) {
        let orders
        let itemsOrder

        if (role === "customer") {

            orders = await this.OrderRepository.findCustomerOrder(user_id)
            itemsOrder = await this.OrderItemsRepository.findCustomerItemsOrder(user_id)

        }
        else if (role === "admin") {
            orders = await this.OrderRepository.findAllOrder()
            itemsOrder = await this.OrderItemsRepository.findAllItemsOrder()
        }

        const orderWithItemsOrder = orders.map(order => {
            const filteredOrderitems = itemsOrder.filter(item => item.order_id === order.id)

            return {
                ...order,
                itemsOrder: filteredOrderitems
            }
        })

        if (orderWithItemsOrder.length === 0) {
            throw new AppError("Nenhum pedido foi encontrado.", 400);
        }

        return { orderWithItemsOrder }

    }
}

module.exports = IndexOrderService