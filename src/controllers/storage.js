const PUBLIC_URL = process.env.PUBLIC_URL;

//models
const { Storage } = require('../models/storage');

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { file,destination,userSession } = req;

    const newFile = await Storage.create({
        url: `${PUBLIC_URL}/${destination}/${file.filename}`,
        userId: userSession.id
    });

    res.status(200).json({
        status: 'success',
        newFile
    })
});

const deleted = catchAsync(async (req,res,next)=>{
    const { file,userSession } = req;

    if (parseInt(file.userId) !== parseInt(userSession.id)) {
        return next(new AppError('You dont owner this file',403));
    };

    await file.update({
        status: 'delete'
    });

    res.status(200).json({
        status: 'success'
    })
})

module.exports = {
    create,
    deleted
};