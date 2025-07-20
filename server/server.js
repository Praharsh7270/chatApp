import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connect } from 'http2';
import { connectDB } from './lib/db.js';
import userRouter from './Routes/UserRoutes.js';
import messageRouter from './Routes/MeassageRoutes.js';
import { authMiddleware } from './Middleware/auth.js';
import { Server } from 'socket.io';



// create express app and http server

const app = express();
dotenv.config();

const server = http.createServer(app);

// Middle ware set up 


app.use(express.json({ limit: '50mb' }));
app.use(cors())


app.use("/api/status", (req,res) =>{
    res.send("Server is running");
})


// Socket.io setup
export const io = new Server(server, {
    cors: {
        origin:"*",
    }

})

export const userSocketMap = {}

io.on("connection", (socket) =>{
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // emmit  online users get online users
    socket.emit("onlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });
})

//Routes setup
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter);

// Connect to mongodb 

await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
