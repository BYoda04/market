const { body, validationResult } = require('express-validator');

//models

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

/* 
*body('number').isMobilePhone({ locale: ['es-pe'] }).withMessage('Number invalid try again'), 
*/

const marketsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    checkResult
];

module.exports = { 
	marketsValidator
};