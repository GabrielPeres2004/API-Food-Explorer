const { Router } = require("express")
const addressRoutes = Router()

const AddressController = require('../controllers/AddressController')
const addressController = new AddressController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated.js')

addressRoutes.post("/", ensureAuthenticated, addressController.create)
addressRoutes.delete("/", ensureAuthenticated, addressController.delete)
addressRoutes.get("/", ensureAuthenticated, addressController.show)
addressRoutes.put("/", ensureAuthenticated, addressController.updated)


module.exports = addressRoutes