const express = require('express');

//controllers
const { create, deleted } = require('../controllers/storage');

//utils
const { verifyToken } = require('../utils/tokenVerify');

//middlewares
const { uploadMiddleware, fileExist } = require('../middlewares/storage');

//validators

const storageRouter = express.Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
storageRouter.post("/create", verifyToken, uploadMiddleware.single("file"),create);
storageRouter.delete("/delete/:id", verifyToken, fileExist,deleted);

module.exports = { storageRouter };