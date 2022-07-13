const { body, validationResult } = require('express-validator');

//models
const { Storage } = require('../models/storage');

//utils
const { AppError } = require('../utils/appError');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const checkParameters = async (req,res,next)=>{
	const { storageId } = req.body;

	const storage = await Storage.findOne({
		where:{
			id: storageId,
			status: 'active'
		}
	});

	if (!storage) {
		return next(new AppError('File not avaliable',404));
	};

	next();
};

const productsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity invalid try again'),
	body('price').isNumeric().withMessage('Price invalid try again'),
	body('storageId').isNumeric().withMessage('storage Id invalid try again'),
    checkResult,
	checkParameters,
];

const updateValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    checkResult,
];

module.exports = { 
	productsValidator,
    updateValidator
};