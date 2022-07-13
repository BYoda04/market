const fs = require('fs');

//models
const { Markets } = require("../models/market");
const { Users } = require("../models/users");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { Products } = require('../models/products');
const { Storage } = require('../models/storage');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { user,userSession } = req;
    const { name,number,userId } = req.body;

    if (parseInt(user.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont have permission',404))
    };

    const newMarket = await Markets.create({
        name,
        number,
        userId
    });

    if (!newMarket) {
        return next(new AppError('Error create market',405));
    };

    await user.update({
        role: 'admin'
    });

    const nameDiretory = newMarket.name.replace(/ /g, "-")

    fs.access(`${__dirname}/../storage/${nameDiretory}`,async (err)=>{
        if (err) {
            await fs.mkdirSync(`${__dirname}/../storage/${nameDiretory}`,{ recursive:true });
        };
    });

    res.status(200).json({
        status: 'success',
        newMarket
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { market,userSession } = req;
    const { name,number } = req.body;

    if (parseInt(market.user.id) !== userSession.id) {
        return next(new AppError('You dont owner this market',403));
    };

    if (name) {
        await market.update({
            name
        });
    };

    if (number) {
        if (number.substr(0,3) !== '+51') {
            return next(new AppError('Number invalid',404))
        }

        await market.update({
            number
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const updateStatus = catchAsync(async (req,res,next)=>{
    const { market,userSession } = req;

    if (parseInt(market.user.id) !== userSession.id) {
        return next(new AppError('You dont owner this market',403));
    };

    await market.update({
        status: 'active'
    })

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { market,userSession } = req;

    if (parseInt(market.user.id) !== userSession.id) {
        return next(new AppError('You dont owner this market',403));
    };

    await market.update({
        status: 'delete'
    })

    res.status(201).json({
        status: 'success'
    });
});

const getAllItems = catchAsync(async (req,res,next)=>{

    const data = await Markets.findAll({
        where:{
            status: 'active'
        },
        include:[
            {
                model: Users,
                attributes: ['id','name','number','createdAt','updatedAt']
            },
            {
                model: Products,
                include:{
                    model: Storage,
                    attributes: ['id','url','createdAt','updatedAt']
                },
                attributes: ['id','name','quantity','price','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','number','createdAt','updatedAt']
    });

    if (!data.length) {
        return next(new AppError('Dont markets exists',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const { userSession } = req;

    const data = await Markets.findAll({
        where:{
            userId: userSession.id
        },
        include:[
            {
                model: Users,
                attributes: ['id','name','email','number','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','number','suscription','status','createdAt','updatedAt']
    });

    if (!data.length) {
        return next(new AppError('You dont have markets',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { market } = req;

    res.status(200).json({
        status: 'success',
        market
    })
})

module.exports = {
    create,
    update,
    updateStatus,
    deleted,
    getAllItems,
    getItems,
    getItem,
}