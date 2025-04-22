const { Router } = require('express')
const dishRoutes = Router()

const multer = require('multer')
const uploadConfig = require('../config/uploadsConfig.js')
const upload = multer(uploadConfig.MULTER)

const DishController = require('../controllers/DishController')
const dishController = new DishController()

const DishImageController = require('../controllers/DishImageController')
const dishImageController = new DishImageController()

const DisabledDishController = require('../controllers/DisabledDishController.js')
const disabledDishController = new DisabledDishController()

const ActiveDishController = require('../controllers/ActiveDishController.js')
const activeDishController = new ActiveDishController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated.js')
const userRoleVerify = require('../middleware/UserRoleVerify.js')

dishRoutes.use(ensureAuthenticated)

dishRoutes.get('/dishDisable', userRoleVerify("admin"), disabledDishController.index)
dishRoutes.patch('/disable/:id', userRoleVerify("admin"), disabledDishController.update)

dishRoutes.patch('/active/:id', userRoleVerify("admin"), activeDishController.update)

dishRoutes.get('/', dishController.index)
dishRoutes.post('/', userRoleVerify("admin"), upload.single("imageDish"), dishController.create)
dishRoutes.delete('/:id', userRoleVerify("admin"), dishController.delete)
dishRoutes.put('/:id', userRoleVerify("admin"), dishController.update)

dishRoutes.get('/:id', dishController.show)

dishRoutes.patch('/imageDish/:id', userRoleVerify("admin"), upload.single("imageDish"), dishImageController.update)
dishRoutes.post('/imageDish', userRoleVerify("admin"), upload.single("imageDish"), dishImageController.create)


module.exports = dishRoutes