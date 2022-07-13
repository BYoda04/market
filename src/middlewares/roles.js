//models
const { Roles } = require("../models/roles");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const roleExists = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const role = await Roles.findOne({
        where:{
            id,
            status: 'active'
        }
    });

    if (!role) {
        return next(new AppError('Role dont exist',404));
    };

    req.role = role;

    next();
});

module.exports = { roleExists };