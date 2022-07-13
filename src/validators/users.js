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
when create a users client
body('password')
.isLength({ min: 5 })
.withMessage('Password must be at least 5 characters long')
.isAlphanumeric()
.withMessage('Password must contain letters and numbers'), */

const usersValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	checkResult,
];

const passwordValidator = [
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