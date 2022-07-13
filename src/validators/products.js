const { body, validationResult } = require('express-validator');

//models
const { Storage } = require('../models/storage');
const { Markets } = require('../models/market');

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
	const { userSession } = req;
	const { storageId,marketId } = req.body;

	const storage = await Storage.findOne({
		where:{
			id: storageId,
			status: 'active'
		}
	});

	if (!storage) {
		return next(new AppError('File not avaliable',404));
	};

	const market = await Markets.findOne({
		where:{
			id: marketId,
			status: 'active'
		}
	});

	if (!market) {
		return next(new AppError('Market dont exists',404));
	};

	if (parseInt(market.userId) !== parseInt(userSession.id)) {
		return next(new AppError('You dont owner this market',403));
	};

	next();
};

const productsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity invalid try again'),
	body('price').isNumeric().withMessage('Price invalid try again'),
	body('storageId').isNumeric().withMessage('Storage Id invalid try again'),
	body('marketId').isNumeric().withMessage('Market Id invalid try again'),
    checkResult,
	checkParameters,
];

module.exports = { 
	productsValidator
};