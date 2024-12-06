const AppError = require('../../utils/appError')


class UpdateOrderService {
    constructor(OrderRepository) {
        this.OrderRepository = OrderRepository
    }

    async execute(id, status) {
        if ((!['pending', 'completed', 'cancelled'].includes(status))) {
            throw new AppError("O status fornecido é inválido.", 400);
        }

        await this.OrderRepository.updateOrderStatus(id, status)

        return

    }
}

module.exports = UpdateOrderService