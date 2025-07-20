import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connect } from 'http2';
import { connectDB } from './lib/db.js';
import userRouter from './Routes/UserRoutes.js';



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

//Routes setup
app.use("/api/auth", userRouter)

// Connect to mongodb 

await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
