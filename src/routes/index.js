const { Router } = require("express")
const routes = Router()

const userRoutes = require('./user.routes.js')
const dishRoutes = require('./dish.routes.js')
const sessionRoutes = require('./sessions.routes.js')
const addressRoutes = require('./address.routes.js')
const orderRoutes = require('./order.routes.js')
const favoriteRoutes = require("./favorite.routes.js")

routes.use('/user', userRoutes)
routes.use('/dish', dishRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/address', addressRoutes)
routes.use('/order', orderRoutes)
routes.use('/favorite', favoriteRoutes)

module.exports = routes