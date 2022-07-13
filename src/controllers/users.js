const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const { Users } = require('../models/users');
const { Markets } = require('../models/market');

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require('../utils/appError');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,email,number,password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptPass = await bcrypt.hash(password,salt);

    const newUser = await Users.create({
        name,
        number,
        email,
        password: encryptPass
    });

    newUser.password = undefined;

    res.status(200).json({
        status: 'success',
        newUser
    });
});

const login = catchAsync(async (req,res,next)=>{
    const { email, password } = req.body;

    const user = await Users.findOne({
        where:{
            email,
            status:'active'
        }
    });

    if (!user) {
        return next(new AppError('User not exist',404));
    };

    const validPass = await bcrypt.compare(password,user.password);

    if (!validPass) {
        return next(new AppError('Invalid password',404));
    };

    const token = jwt.sign({ 
        id: user.id
    },process.env.JWT_SIGN,{
        expiresIn:'24h',
    });

    res.status(200).json({
        status:'succes',
        token
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { user, userSession } = req;
    const { name,number} = req.body;

    if (parseInt(user.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont have permission',404))
    };

    if (name) {
        await user.update({
            name
        });
    };

    if (number) {
        if (number.substr(0,3) !== '+51') {
            return next(new AppError('Number invalid',404))
        }

        await user.update({
            number
        });
    };

    res.status(201).json({ status: 'success' });
});

const updatePassword = catchAsync(async (req,res,next)=>{
    const { user, userSession } = req;
    const { last_password,password } = req.body;

    if (user.id !== userSession.id) {
        return next(new AppError('You are not the owner of this account',403));
    };

    const validPass = await bcrypt.compare(last_password,user.password);

    if (!validPass) {
        return next(new AppError('Invalid password',404));
    };

    const passRepeat = await bcrypt.compare(password,user.password);

    if (passRepeat) {
        return next(new AppError('Password same as your previous password',404))
    }

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

    await user.update({
        password: encryptPass,
    });
    
    res.status(200).json({
        status: 'succes',
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { user, userSession } = req;

    if (parseInt(user.id) !== parseInt(userSession.id)) {
        return next(new AppError('You dont have permission',404))
    }

    const markets = await Markets.findAll({
        where: {
            userId: userSession.id,
            status: 'active'
        }
    })

    if (!markets.length) {
        markets.map(async market=>{
            await market.update({ status: 'delete' });
        })
    }

    await user.update({ status: 'delete' });

    res.status(201).json({ status: 'success' });
});

module.exports = {
    create,
    login,
    update,
    updatePassword,
    deleted,
}