const asyncHander = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status (400);
        throw new Error ('All fields are manadtory');
    }

    const userExists = await UserActivation.findOne({email});
    if(userExists){
        res.status(400);
        throw new error ('User Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPaswordd = await bcrypt.hash(password,slat);
    const user = await UserActivation.create ({name, email, password: hashedpassword})
    if (user){
        res.status(201).json({
            _id: user.id, name: user.name,
            email: user.email,
            token: generateJWTtoken(user._id)
        })
    }else {
        res.status (400)
        throw new error ('Invalid user data')
    }
})

const loginUser = asyncHandler(async(req, res) =>{
    const { email, password} = req.body;
    
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTtoken(user._id)
        })
    } else {
        res.status(400);
        throw new Error ('Invalid data');
    }
})

const getCurrentUser = asyncHandler(async(req, res) =>{
    res.json ({message: 'Current User data'})
})

const generateJWTtoken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '5d'});
module.exports = { registerUser, loginUser, getCurrentUser}
