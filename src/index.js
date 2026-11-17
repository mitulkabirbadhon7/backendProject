//require('dotenv').config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: '.env',
})


connectDB();










/* 
;(async()=>{

    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
    }
    catch(error){
        console.error("ERROR",error);
        throw error
        
    }
})()
    */