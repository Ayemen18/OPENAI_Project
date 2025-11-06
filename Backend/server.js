import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes)
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
    connectDB();
})


const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
}

