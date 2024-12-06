const { Router } = require('express')
const dishRoutes = Router()

const multer = require('multer')
const uploadConfig = require('../config/uploadsConfig.js')
const upload = multer(uploadConfig.MULTER)

const DishController = require('../controllers/DishController')
const dishController = new DishController()

const DishImageController = require('../controllers/DishImageController')
const dishImageController = new DishImageController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated.js')
const userRoleVerify = require('../middleware/UserRoleVerify.js')

dishRoutes.use(ensureAuthenticated)

dishRoutes.get('/', dishController.index)
dishRoutes.post('/', userRoleVerify("admin"), dishController.create)
dishRoutes.delete('/:id', userRoleVerify("admin"), dishController.delete)
dishRoutes.put('/:id', userRoleVerify("admin"), dishController.update)
dishRoutes.patch('/imageDish/:id', upload.single("imageDish"), dishImageController.update)
dishRoutes.get('/:id', dishController.show)


module.exports = dishRoutes