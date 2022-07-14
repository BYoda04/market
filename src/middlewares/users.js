//models
const { Markets } = require("../models/market");
const { Users } = require("../models/users");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const userExists = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id,
            status:'active'
        },
        include: [
            {
                model: Markets,
                attributes: ['id','name','number','status','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','number','email','password','role','createdAt','updatedAt']
    });

    if (!user) {
        return next(new AppError('User not found',404));
    };

    req.user = user;

    next();
});

module.exports = { userExists };