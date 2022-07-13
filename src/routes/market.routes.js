const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getAllItems, updateStatus } = require('../controllers/market');

//middlewares
const { userExists } = require('../middlewares/users');
const { marketExists, marketDelete } = require('../middlewares/market');

//validators
const { marketsValidator } = require('../validators/market');

//utils
const { verifyToken, onlyAdmin } = require('../utils/verifyToken');

const marketsRouter = express.Router();

//htttp://localhost:port/api/v1/users GET,POST,DELET,PUT
marketsRouter.post("/create/:id", verifyToken, userExists, marketsValidator,create);
marketsRouter.patch("/update/:id", verifyToken, onlyAdmin, marketExists,update);
marketsRouter.patch("/update/status/:id", verifyToken, onlyAdmin, marketDelete,updateStatus);
marketsRouter.delete("/delete/:id", verifyToken, onlyAdmin, marketExists,deleted);
marketsRouter.get("/", verifyToken,getAllItems);
marketsRouter.get("/me", verifyToken, onlyAdmin,getItems);
marketsRouter.get("/market/:id", verifyToken, marketExists,getItem);

module.exports = { marketsRouter };