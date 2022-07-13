//models
const { Roles } = require("../models/roles");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name } = req.body;

    const newRole = await Roles.create({
        name
    });

    res.status(200).json({
        status: 'success',
        newRole
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { role } = req;

    await role.update({
        status: 'deleted'
    })

    res.status(201).json({
        status: 'success'
    });
});

module.exports = {
    create,
    deleted,
};