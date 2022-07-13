const express = require('express');

//controllers
const { create, login, update, deleted, updatePassword } = require('../controllers/users');

//middlewares
const { userExists } = require('../middlewares/users');

//validators
const { usersValidator, passwordValidator } = require('../validators/users');

//utils
const { verifyToken } = require('../utils/verifyToken');

const usersRouter = express.Router();

//htttp://localhost:port/api/v1/users GET,POST,DELET,PUT
usersRouter.post("/create", usersValidator,create);
usersRouter.post("/login",login);
usersRouter.patch("/update/:id", verifyToken, userExists,update);
usersRouter.patch("/update/password/:id", verifyToken, userExists, passwordValidator,updatePassword);
usersRouter.delete("/delete/:id", verifyToken, userExists,deleted);

module.exports = { usersRouter };