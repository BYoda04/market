//Models
const { Markets } = require('../models/market');
const { Products } = require('../models/products');
const { Storage } = require('../models/storage');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const productExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const product = await Products.findOne({ 
		where:{
			id,
			status: 'active'
		},
        include:[
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            },
			{
				model: Markets,
				attributes: ['id','name','userId']
			}
        ],
        attributes: ['id','name','quantity','price','createdAt','updatedAt']
	});

	if (!product) {
		return next(new AppError('Product not found',404));
	}

	req.product = product

	next()
});

module.exports = {
    productExist
};