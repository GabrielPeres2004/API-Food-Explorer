const { Router } = require('express')
const userRoutes = Router()

const multer = require('multer')
const uploadConfig = require('../config/uploadsConfig.js')
const upload = multer(uploadConfig.MULTER)


const UserController = require('../controllers/UserController.js')
const userController = new UserController()

const UserAvatarController = require('../controllers/UserAvatarController.js')
const userAvatarController = new UserAvatarController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated.js')

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = userRoutes