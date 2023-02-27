const menuRoutes = require('express').Router()
const menuControllers = require('../controllers/menuControllers');
// const authMidleware = require('../midleware/authMidleware');
const uploadMiddleware = require('../midleware/uploadMiddleware')
const cloudinaryMiddleware = require('../midleware/cloudDinaryMiddleware')

menuRoutes.post('/', 
// authMidleware.checkLogin,
uploadMiddleware, cloudinaryMiddleware,
menuControllers.postDataMenu);
menuRoutes.get('/', menuControllers.getAllData);
menuRoutes.delete('/:id', menuControllers.deleteData)
menuRoutes.put('/:id',menuControllers.updateData )
menuRoutes.get('/:id', menuControllers.getById)

module.exports = menuRoutes;