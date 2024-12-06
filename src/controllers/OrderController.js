const OrderRepository = require('../repositories/OrderRepository')
const DishRepository = require('../repositories/DishRepository')
const OrderItemsRepository = require('../repositories/OrderItemsRepository')

const IndexOrderService = require('../services/Order/IndexOrderService')
const CreateOrderService = require('../services/Order/CreateOrderService')
const ShowOrderService = require('../services/Order/ShowOrderService')
const UpdateOrderService = require('../services/Order/UpdateOrderService')

class OrderController {
    async create(request, response) {
        const { paymentType, deliveryType, orderCompleted, payment, numberInstallments, OrderItems } = request.body
        const user_id = request.user.id

        const dishRepository = new DishRepository()
        const orderRepository = new OrderRepository()
        const orderItemsRepository = new OrderItemsRepository()
        const createOrderService = new CreateOrderService(orderRepository, dishRepository, orderItemsRepository)

        await createOrderService.execute(paymentType, deliveryType, orderCompleted, payment, numberInstallments, OrderItems, user_id)

        return response.json({ message: "Pedido criado com sucesso" })


    }

    async index(request, response) {
        const { role, id } = request.user

        const orderRepository = new OrderRepository()
        const orderItemsRepository = new OrderItemsRepository()
        const indexOrderService = new IndexOrderService(orderRepository, orderItemsRepository)

        const { orderWithItemsOrder } = await indexOrderService.execute(role, id)

        return response.json(orderWithItemsOrder)

    }

    async show(request, response) {
        const { id } = request.params

        const orderRepository = new OrderRepository()
        const orderItemsRepository = new OrderItemsRepository()
        const showOrderService = new ShowOrderService(orderRepository, orderItemsRepository)

        const { orderWithItems } = await showOrderService.execute(id)

        return response.json(orderWithItems)
    }

    async update(request, response) {
        const { id } = request.params
        const { status } = request.body

        const orderRepository = new OrderRepository()
        const updateOrderService = new UpdateOrderService(orderRepository)

        await updateOrderService.execute(id, status)


        return response.json({ message: "Pedido atualizado com sucesso" })

    }
}

module.exports = OrderController