import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema ({
    SenderId:{
        type: mongoose.Schema.Types.ObjectId, ref:"User" , required:true
    },
    recevierId:{
        type: mongoose.Schema.Types.ObjectId, ref:"User" , required:true
    },
    text: {
        type : String
    },
    image:{
        type:String,
    },
    seen:{
        type:Boolean,
        default:false
    }
}, {timestamps: true});


const Message = mongoose.model("Message", MessageSchema);


export default Message;