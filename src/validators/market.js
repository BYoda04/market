const { body, validationResult } = require('express-validator');

//models
const { Users } = require('../models/users');

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
	const { userId } = req.body;

    if (parseInt(userId) !== parseInt(userSession.id)) {
        return next(new AppError('You dont have permission',403));
    };

	const user = await Users.findOne({
		where:{
			id: userId,
			status: 'active'
		}
	});
    
	if (!user) {
        return next(new AppError('User dont exists',404));
	};

	next();
};

/* 
*body('number').isMobilePhone({ locale: ['es-pe'] }).withMessage('Number invalid try again'), 
*/

const marketsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    checkResult,
	body('userId').isNumeric().withMessage('User Id invalid try again'),
    checkResult,
	checkParameters,
];

module.exports = { 
	marketsValidator
};