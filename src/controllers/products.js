//models
const { Products } = require("../models/products");
const { Storage } = require("../models/storage");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,quantity,price,storageId,marketId } = req.body;

    const newProduct = await Products.create({
        name,
        quantity,
        price,
        storageId,
        marketId
    });

    res.status(200).json({
        status: 'success',
        newProduct
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { product,userSession } = req;
    const { name,quantity,price,storageId } = req.body;

    if (parseInt(product.market.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont owner this product',403));
    };

    if (name) {
        await product.update({
            name
        });
    };

    if (quantity) {
        await product.update({
            quantity
        });
    };

    if (price) {
        await product.update({
            price
        })
    };

    if (storageId) {
        const storage = await Storage.findOne({
            where: {
                id: storageId,
                status: 'active'
            }
        });

        if (!storage) {
            return next(new AppError('Invalid storage id try again',404));
        };

        await product.update({
            storageId
        })
    }


    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { product,userSession } = req;
    
    if (parseInt(product.market.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont owner this product',403));
    };

    await product.update({
        status: 'delete'
    });

    res.status(201).json({
        status: 'success'
    });
});

module.exports = {
    create,
    update,
    deleted,
};