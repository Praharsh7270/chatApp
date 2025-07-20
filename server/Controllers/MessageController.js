// Get all the user 

import Message from "../Models/Message.js";
import User from "../Models/User.js";
import cloudinary from "../lib/Cloudnary.js";
import { io , userSocketMap} from "../server.js";

export const getUserForSidebar = async (req,res) =>{
    try{
        const userId = req.userId;
        const filterUser = await User.find({_id: {$ne: userId}}).select("-password");

        // Count number of msg not seen 

        const unseenMsg = {};

        const promises = filterUser.map(async (user) =>{
            const messages = await Message.find({
                SenderId: user._id,
                recevierId: userId,
                seen: false
            })
            if (messages.length > 0) {
                unseenMsg[user._id] = messages.length;
            }
        })

        await Promise.all(promises);
        res.json({
            success: true,
            users: filterUser,
            unseenMsg,
            message: "Users fetched successfully"
        });
    }
    catch(err){
        console.error("Error in getUserForSidebar:", err);
        throw new Error("Internal server error, Unable to fetch users for sidebar");
    }
}



// Get all msg for selected user 


export const getMessages = async (req, res) => {

    try{
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                {SenderId: myId, recevierId: selectedUserId},
                {SenderId: selectedUserId, recevierId: myId}
            ]
        })
        await Message.updateMany(
            {SenderId: selectedUserId, recevierId: myId, seen: false},
            {seen: true}
        );

        res.json({
            success: true,
            messages: message,
            message: "Messages fetched successfully"
        })
    }

    catch (err) {
        console.error("Error in getMessages:", err);
        res.status(500).json({message: "Internal server error, Unable to fetch messages"});
    }
}



// api to mark messages as seen message id

export const markMeasseagesAsSeen = async (req, res) => {
    try{
        const {messageId} = req.body;
        await Message.findByIdAndUpdate(messageId, {seen: true});
        res.json({success: true, message: "Message marked as seen"});
    }
    catch(err){

        console.error("Error in markMeasseagesAsSeen:", err);
        res.status(500).json({message: "Internal server error, Unable to mark messages as seen"});
    }
}


// Send msg to users


export const sendMsg = async (req,res) =>{
    try{
        const {text,image} = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let imageUrl ;

        if (image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }

        const NewMsg = await Message.create({
            SenderId: senderId,
            recevierId: receiverId,
            text,
            image: imageUrl
        });

        // Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", NewMsg);
        }

        res.json({
            success: true,
            message: NewMsg,
            message: "Message sent successfully"
        });
    }

    catch(err){

    }
}