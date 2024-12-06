const { Router } = require("express")
const favoriteRoutes = Router()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const FavoriteController = require("../controllers/FavoriteController")
const favoriteController = new FavoriteController()


favoriteRoutes.post('/:dish_id', ensureAuthenticated, favoriteController.create)
favoriteRoutes.delete('/:dish_id', ensureAuthenticated, favoriteController.delete)
favoriteRoutes.get('/', ensureAuthenticated, favoriteController.index)


module.exports = favoriteRoutes