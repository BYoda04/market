const express = require('express');

//controllers
const { create, deleted } = require('../controllers/roles');

//middlewares
const { roleExists } = require('../middlewares/roles');

//validators
const { rolesValidator } = require('../validators/roles');

//utils
const { onlyAdmin, verifyToken } = require('../utils/verifyToken');

const rolesRouter = express.Router();

//htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
rolesRouter.post("/create", verifyToken, onlyAdmin, rolesValidator,create);
rolesRouter.delete("/delete/:id", verifyToken, onlyAdmin, roleExists,deleted);

module.exports = { rolesRouter };