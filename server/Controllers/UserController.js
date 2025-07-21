

// sigup new user
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Models/User.js";
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/Cloudnary.js';



export const signup = async (req, res) => {
    const {email, fullName, password, bio} = req.body;

    try{
        if (!email || !fullName || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData:newUser,
            token,
            message: "User created successfully"
        })
    }
    catch (err){
        console.error("Error in signup:", err);
        res.status(500).json({message: "Internal server error, User not created successfully"});
    }
}


// login user

export const login = async (req, res) =>{
    try{

        const {email,password} = req.body;

        const userData =  await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }
    
        const token = generateToken(userData._id);
        res.json({
            success: true,
            userData,
            token,
            message: "User logged in successfully"
        });
    }
    catch(err){
        console.error("Error in login:", err);
        res.status(500).json({message: "Internal server error, User not logged in successfully"});

    }
}


// Controller to get user profile

export const checkAuth = (req,res) =>{
    res.json({
        success: true,
        user: req.user, // User is attached to the request object by authMiddleware
        message: "User is authenticated"
    }); 
}


export const updateProfile = async (req, res) => {

    try{
        const {fullName,bio, ProFilePic} = req.body;

        const userId = req.user._id; // Get user ID from the authenticated user

        let updateData;

        if(!ProFilePic){
            updateData = await User.findByIdAndUpdate(userId, {
                fullName,
                bio
            }, {new: true});
        }
        else {
            const upload = await cloudinary.uploader.upload(ProFilePic)

            updateData = await User.findByIdAndUpdate(userId, {
                ProFilePic: upload.secure_url,
                fullName,
                bio
            }, {new: true});
        }
        res.json({
            success: true,
            userData: updateData,
            message: "Profile updated successfully"
        });
    }
    catch(err){
        console.error("Error in updateProfile:", err);
        res.status(500).json({message: "Internal server error, Profile not updated successfully"});
    }
}