//models
const { Markets } = require("../models/market");
const { Users } = require("../models/users");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const marketExists = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const market = await Markets.findOne({
        where: {
            id,
            status:'active'
        },
        include:[
            {
                model: Users,
                attributes: ['id','name','email','number','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','number','suscription','status','createdAt','updatedAt']
    });

    if (!market) {
        return next(new AppError('Market not found',404));
    };

    req.market = market;

    next();
});

const marketDelete = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const market = await Markets.findOne({
        where: {
            id,
            status:'delete'
        },
        include:[
            {
                model: Users,
                attributes: ['id','name','email','number','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','number','suscription','status','createdAt','updatedAt']
    });

    if (!market) {
        return next(new AppError('Market not found',404));
    };

    req.market = market;

    next();
});

module.exports = { 
    marketExists,
    marketDelete,
};