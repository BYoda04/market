const multer = require('multer');
const fs = require('fs');

//models
const { Storage } = require('../models/storage');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const storage = multer.diskStorage({
    destination: function (req,file,cb){

        const pathstorage = `${__dirname}/../storage/${req.destination}`
        
        cb(null,pathstorage);
    },
    filename: function (req,file,cb){
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null,filename);
    }
});

const uploadMiddleware = multer({ storage });

const fileExist = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const file = await Storage.findOne({
        where:{
            id,
            status: 'active'
        }
    });

    if (!file) {
        return next(new AppError('File not found',404));
    };

    req.file = file;

    next();
});

const storageExists = catchAsync(async (req,res,next)=>{
    const { market,userSession } = req;

    if (parseInt(market.user.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont the owner this market',403));
    };

    const name = market.name.replace(/ /g, "-")

    fs.access(`${__dirname}/../storage/${name}`,async (err)=>{
        if (err) {
            fs.mkdirSync(`${__dirname}/../storage/${name}`,{ recursive:true });
        };
    });

    req.destination = name

    next();
})

module.exports = {
    uploadMiddleware,
    fileExist,
    storageExists
}