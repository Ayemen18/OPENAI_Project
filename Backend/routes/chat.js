import express from "express";
import Thread from "../models/Thread.js"
import getOpenAIApiResponse from "../utils/openAi.js";

const router = express.Router();

router.post('/test', async(req,res)=>{
    try {
        const thread = new Thread({
            threadid : "abc",
            title : "New testing thread"
        });

        const response = await thread.save();
        res.send(response);
    } catch( err ){
        res.status(500).json({error : "Failed to save in DB"});
    }
});

//Get all threads 
router.get("/thread", async(req,res)=>{
    try{
        let threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    } catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to fetch threads"});
    }
});

//Get one threads chat 
router.get("/thread/:threadid", async(req,res)=>{
    const {threadid} = req.params;
    try{
        let thread = await Thread.findOne({threadid});
        if(!threadid){
           return res.status(404).json({error : "Thread not found!"});
        }
        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({error : "Failed to fetch thread"});
    }
});

//Delete the thread

router.delete("/thread/:threadid", async(req,res)=>{
    const {threadid} = req.params;
    try{
        let deletedThread = await Thread.findOneAndDelete({threadid});
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

router.post("/chat", async(req,res)=>{
    const {threadid, message} = req.body;

    if(!threadid || !message){
       return res.status(400).json({error : "missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadid});
        if(!thread){
            //new threadid so create the thread
            thread = new Thread({
                threadid,
                title : message,
                messages : [{role : "user", content : message}],
            });
        } else{
            //The threadid already exists
            thread.messages.push({role : "user", content : message});
        }

        const assistantReply = await getOpenAIApiResponse(message);

        thread.messages.push({role : "assistant", content : assistantReply})
        thread.updateAt = new Date();

        await thread.save();
        res.json({reply : assistantReply});

    } catch(err) {
        console.log(err);
        res.status(500).json({error : "Something went wrong"})
    }
})


export default router; 