const express = require('express');

//controllers
const { create, update, deleted } = require('../controllers/products');

//middlewares

//validators
const { productsValidator } = require('../validators/products');

//utils
const { verifyToken, onlyAdmin } = require('../utils/verifyToken');
const { productExist } = require('../middlewares/products');

const productsRouter = express.Router();

//htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
productsRouter.post("/create", verifyToken, onlyAdmin, productsValidator,create);
productsRouter.patch("/update/:id", verifyToken, onlyAdmin, productExist,update);
productsRouter.delete("/delete/:id", verifyToken, onlyAdmin, productExist,deleted);


module.exports = { productsRouter };