const AppError = require('../../utils/appError')

class CreateOrderService {
    constructor(OrderRepository, DishRepository, OrderItemsRepository) {
        this.OrderRepository = OrderRepository
        this.DishRepository = DishRepository
        this.OrderItemsRepository = OrderItemsRepository
    }

    async execute(paymentType, deliveryType, orderCompleted, payment, numberInstallments, OrderItems, user_id) {
        if (!user_id) {
            throw new AppError("Apenas usuários autenticados", 401);
        }

        if (!OrderItems) {
            throw new AppError("Primeiro adicione itens para fazer o pedido");
        }

        if (!paymentType) {
            throw new AppError("Informe um metodo de pagamento");
        }

        if (!deliveryType) {
            throw new AppError("Informe o tipo de delivery");
        }

        if (paymentType === "creditCard" && !numberInstallments) {
            throw new AppError("Informe o numero de parcelas");
        }

        if (numberInstallments < 1) {
            throw new AppError("O número de parcelas mínimas é 1");
        }


        const formattedItems = OrderItems.map(item => ({
            dish_id: item.id,
            count: item.quantity
        }));

        const dishes = await this.DishRepository.findDishToOrder(formattedItems)

        const paymentTotal = OrderItems.reduce((total, item) => {
            const dishSum = dishes.find(dish => dish.id === item.dish_id);
            if (dishSum) {
                return total + (dishSum.price * item.count);
            }
            return total;
        }, 0);


        try {
            const { order_id } = await this.OrderRepository.create({
                paymentType,
                deliveryType,
                orderCompleted,
                payment: paymentTotal,
                numberInstallments,
                user_id
            })

            await this.OrderItemsRepository.create(order_id, user_id, formattedItems)


        } catch (error) {
            throw new AppError("Não foi possível finalizar o seu pedido.");
        }

    }
}


module.exports = CreateOrderService