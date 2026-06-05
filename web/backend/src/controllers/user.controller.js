import {User} from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import {comparePassword} from '../models/User.js';
// single import for User model

dotenv.config();

//Generating accessToken and refreshToken
const generateTokens = async(user._id) => {
    try {
        const user = await User.findById(user._id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return { accessToken, refreshToken };
    }
    catch{
        throw new apiError(500, 'Failed to generate tokens');
    }

}

//Register User
const registerUser = asyncHandler(async(req, res) => {
    //Get details from the frontend

    //Normalize the request body by trimming whitespace from keys and values
    //These key and values are the ones sent from the frontend to the backend in the request body. The normalization process ensures that any leading or trailing whitespace is removed from both the keys and values, which can help prevent issues related to inconsistent formatting and improve data integrity.
    const normalizedBody = Object.fromEntries(
        Object.entries(req.body || {}).map(([key, value]) => [
            key.trim(),
            typeof value === 'string' ? value.trim() : value,
        ])
    )

    //Normalizing fields
    const { username, email, password } = normalizedBody;

    //Check for missing fields
    const requiredFields = ['username', 'email', 'password'];
    const missingFields = Object.entries(requiredFields).filter(([, value]) => !normalizedBody[value]).map(([, key]) => key);

    if (missingFields.length > 0) {
        throw new apiError(400, `Missing required fields: ${missingFields.join(', ')}`);
    }

    //Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new apiError(400, 'User with the same username or email already exists');
    }

    // We leave this because we will update this later as new feature
    //File upload using multer
    //Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this code snippet, we are setting up multer to handle file uploads in our Express application. We define a storage configuration that specifies the destination directory for uploaded files and a filename function that generates unique filenames based on the current timestamp and the original file extension. We then create an instance of multer with this storage configuration, which can be used in our routes to handle file uploads.

    // Creating new user
    const user = await User.create(
        {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        }
    )

    const createdUser = await User.findById(user._id).select(
        "password -refreshToken"
    )

    if(!createdUser) {
        throw new apiError(500, 'Failed to create user');
    }

    return res.status(201).json({
        ...new apiResponse(201, createdUser, 'User registered successfully')
    });
})

//Login User
const loginUser = asyncHandler(async(req, res) => {
    
    //Getting data from the frontend
    const {email, username, password} = req.body;
    if(!username || !email) {
        throw new apiError(400, 'Please provide username or email');
    }
    if(!password) {
        throw new apiError(400, 'Please provide password');
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if(!user) {
        throw new apiError(404, 'User not found');
    }
    
    const isPasswordValid = await bcomparePassword(password, user.password);
    
    if(!isPasswordValid) {
        throw new apiError(401, 'Invalid password');
    }

    const {accessToken, refreshToken} = await generateTokens(user._id);

    return res.status(200).json({
        ...new apiResponse(200, { user: createdUser, accessToken, refreshToken }, 'User logged in successfully')
    });

    const loggedInUser = await User.findById(user._id).select(
        "password -refreshToken"
    )
    
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accesstoken", accessToken, options).cookie("refreshtoken", refreshToken, options).json({
        ...new apiResponse(200, {user: loggedInUser, accessToken, refreshToken}, 'User logged in successfully')
    });
});

//Logging Out User
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
    {
        new: true,
    })
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accesstoken", "", options).cookie("refreshtoken", "", options).json({
        ...new apiResponse(200, null, 'User logged out successfully')
    });
});

export {registerUser, loginUser, logoutUser};