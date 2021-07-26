const { Router } = require("express");
const multer = require('multer');
const uploadConfig = require('./config/upload');
const ProductController = require('./controllers/ProductController')
const LikeController = require('./controllers/LikeController')

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/products', ProductController.index)
routes.post('/createProduct', upload.single('image'), ProductController.store)
routes.post('/product/:id/like', LikeController.store)

module.exports = routes;