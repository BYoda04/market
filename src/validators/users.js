const { body, validationResult } = require('express-validator');

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
*search and agree
body('number').isMobilePhone({ locale: ['es-pe'] }).withMessage('Number invalid try again'),
*/

const usersValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
	.isLength({ min: 5 })
	.withMessage('Password must be at least 5 characters long')
	.isAlphanumeric()
	.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const passwordValidator = [
	body('last_password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
		checkResult,
];

module.exports = { 
    usersValidator,
    passwordValidator
};