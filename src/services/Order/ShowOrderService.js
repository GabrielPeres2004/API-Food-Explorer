const AppError = require('../../utils/appError')

class ShowOrderService {
    constructor(OrderRepository, OrderItemsRepository) {
        this.OrderRepository = OrderRepository
        this.OrderItemsRepository = OrderItemsRepository
    }

    async execute(id) {
        const order = await this.OrderRepository.findOrderWithId(id)
        const itemsOrder = await this.OrderItemsRepository.findByItemsOrderWithOrderId(id)

        if (order.length === 0) {
            throw new AppError("Nenhum pedido foi encontrado.");
        }

        const orderWithItems = {
            ...order,
            itemsOrder
        }

        return { orderWithItems }

    }
}


module.exports = ShowOrderService