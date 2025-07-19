// Function to genrate tokens\
import jwt from 'jsonwebtoken';


export const generateToken = (UserId) => {
    const token = jwt.sign({ UserId }, process.env.JWT_SECRET);
    return token;
}