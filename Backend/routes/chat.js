import express from "express";
import Thread from "../models/Thread.js"
import getOpenAIApiResponse from "../utils/openAi.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


//Get all threads 
router.get("/thread", authMiddleware, async(req,res)=>{
    try{
        let threads = await Thread.find({userId: req.user.id}).sort({updatedAt: -1});
        res.json(threads);
    } catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to fetch threads"});
    }
});

//Get one threads chat 
router.get("/thread/:threadid", authMiddleware, async(req,res)=>{
    const {threadid} = req.params;
    try{
        let thread = await Thread.findOne({threadid, userId: req.user.id});
        if(!thread){
           return res.status(404).json({error : "Thread not found!"});
        }
        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({error : "Failed to fetch thread"});
    }
});

//Delete the thread

router.delete("/thread/:threadid", authMiddleware, async(req,res)=>{
    const {threadid} = req.params;
    try{
        let deletedThread = await Thread.findOneAndDelete({threadid, userId: req.user.id});
        if(!deletedThread){
           return res.status(404).json({error : "Thread not found!"});
        }
        res.status(200).json({success : "Thread deleted successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).json({error : "Failed to fetch thread"});
    }
});

//Chat with AI

router.post("/chat", authMiddleware, async(req,res)=>{
    const {threadid, message} = req.body;

    // 🔍 DEBUG LOG 1: Check if the user is actually logged in
    console.log("1. Logged in User ID:", req.user.id); 

    if(!threadid || !message){
       return res.status(400).json({error : "missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadid, userId: req.user.id});
        
        if(!thread){
            console.log("2. Creating NEW thread for user:", req.user.id);
            
            thread = new Thread({
                userId: req.user.id, // <--- We are setting it here
                threadid,
                title : message.substring(0, 50) + "...",
                messages : [{role : "user", content : message}],
            });

            // 🔍 DEBUG LOG 3: See what Mongoose prepared (Before Saving)
            console.log("3. Thread Object to be saved:", thread);

        } else{
            console.log("2. Found EXISTING thread");
            thread.messages.push({role : "user", content : message});
        }

        const assistantReply = await getOpenAIApiResponse(message);
        thread.messages.push({role : "assistant", content : assistantReply})
        thread.updatedAt = new Date();

        const savedThread = await thread.save(); // Save it
        
        // 🔍 DEBUG LOG 4: See what actually got saved to DB
        console.log("4. Saved to DB:", savedThread);

        res.json({reply : assistantReply});

    } catch(err) {
        console.log("❌ ERROR:", err); // See if validation fails
        res.status(500).json({error : "Something went wrong"})
    }
})


export default router; 