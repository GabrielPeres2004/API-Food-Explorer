const { Router } = require("express")
const addressRoutes = Router()

const AddressController = require('../controllers/AddressController')
const addressController = new AddressController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated.js')


addressRoutes.use(ensureAuthenticated)
addressRoutes.post("/", addressController.create)
addressRoutes.delete("/", addressController.delete)
addressRoutes.get("/", addressController.show)
addressRoutes.put("/", addressController.updated)


module.exports = addressRoutes