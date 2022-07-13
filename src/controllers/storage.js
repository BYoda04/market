const PUBLIC_URL = process.env.PUBLIC_URL;

//models
const { Storage } = require('../models/storage');

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { file } = req;

    const newFile = await Storage.create({
        url: `${PUBLIC_URL}/${file.filename}`
    });

    res.status(200).json({
        status: 'success',
        newFile
    })
});

const deleted = catchAsync(async (req,res,next)=>{
    const { file } = req;

    await file.update({
        status: false
    });

    res.status(200).json({
        status: 'success'
    })
})

module.exports = {
    create,
    deleted
};