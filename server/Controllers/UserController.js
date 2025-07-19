

// sigup new user
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Models/User";
import { generateToken } from '../lib/utils';


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

        const newUser = new User.create ({
            email,
            fullName,
            password: hashedPassword,
            ProFilePic,
            bio
        })

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



