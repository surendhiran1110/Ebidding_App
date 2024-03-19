import express from "express";

import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
// import { PostItem } from "./Models/Createlisting.js";//
import rout from "./Routes/Createlistingoute.js";
import cors from "cors";
const app =express();
app.use(cors());

app.use(express.json());



app.use('/',rout);
// app.get('/',(req,res)=>{
//     console.log(req);
//     return res.status(200).send("welcome")
// });


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("connected to DB");
    app.listen(PORT,()=>{
        console.log(`app listening to port :${PORT}`);
    
    });
})
.catch((error)=>{
    console.log("Not Connected" + error);
});