//models
const { Products } = require("../models/products");
const { Storage } = require("../models/storage");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,quantity,price,storageId } = req.body;

    const newProduct = await Products.create({
        name,
        quantity,
        price,
        storageId
    });

    res.status(200).json({
        status: 'success',
        newProduct
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { product } = req;
    const { name,quantity,price } = req.body;

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
    }

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { product } = req;

    await product.update({
        status: "delete"
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{

    const products = await Products.findAll({
        where:{
            status: 'active',
        },
        include:[
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            }
        ],
        attributes: ['id','file_name','permission','userId','createdAt','updatedAt']
    });

    if (!products.length) {
        return next(new AppError('Products not avaliable',404))
    }

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { data } = req;

    res.status(200).json({
        status: 'success',
        data
    })
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getItem,
};