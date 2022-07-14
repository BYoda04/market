const express = require('express');

//controllers
const { create, update, deleted, getItems, getItem, getAllItems, updateStatus, createSellers } = require('../controllers/market');

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
marketsRouter.post("/agreesellers/:id/:marketId", verifyToken, onlyAdmin, userExists, marketExists,createSellers);
marketsRouter.patch("/update/:marketId", verifyToken, onlyAdmin, marketExists,update);
marketsRouter.patch("/update/status/:marketId", verifyToken, onlyAdmin, marketDelete,updateStatus);
marketsRouter.delete("/delete/:marketId", verifyToken, onlyAdmin, marketExists,deleted);
marketsRouter.get("/", verifyToken,getAllItems);
marketsRouter.get("/me", verifyToken, onlyAdmin,getItems);
marketsRouter.get("/market/:marketId", verifyToken, marketExists,getItem);

module.exports = { marketsRouter };