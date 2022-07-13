const express = require('express');

//controllers
const { create, deleted } = require('../controllers/storage');

//utils
const { verifyToken, onlyAdmin } = require('../utils/verifyToken');

//middlewares
const { uploadMiddleware, fileExist, storageExists } = require('../middlewares/storage');
const { marketExists } = require('../middlewares/market');

//validators

const storageRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
storageRouter.post("/create/:id", verifyToken, onlyAdmin, marketExists, storageExists, uploadMiddleware.single("file"),create);
storageRouter.delete("/delete/:id", verifyToken, onlyAdmin, fileExist,deleted);

module.exports = { storageRouter };