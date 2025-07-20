

// Middleware to check if user is authenticated

import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const authMiddleware =async (req, res, next) => {
    try{
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.UserId).select("-password");

        if (!user) {
            return res.status(401).json({message: "Unauthorized access"});
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        return res.status(401).json({message: "Unauthorized access 2"});  
    }
}