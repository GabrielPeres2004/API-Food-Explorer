const { Router } = require('express')
const orderRoutes = Router()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const userRoleVerify = require('../middleware/UserRoleVerify.js')

const OrdersController = require('../controllers/OrderController')
const ordersController = new OrdersController

orderRoutes.get('/:id', ensureAuthenticated, ordersController.show)
orderRoutes.post('/', ensureAuthenticated, ordersController.create)
orderRoutes.put('/:id', ensureAuthenticated, userRoleVerify("admin"), ordersController.update)
orderRoutes.get('/', ensureAuthenticated, ordersController.index)


module.exports = orderRoutes