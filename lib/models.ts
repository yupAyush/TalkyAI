import mongoose from "mongoose";
import { boolean } from "zod";


const schema= new mongoose.Schema({
    role:String,
    level:String,
    techstack:[String],
    questions:[String],
    type:String,
    username:String,
    createdAt:String,
    amount:Number,
    Finalized:{type:boolean,default:false},
    feedback:{type:String,default:""} 
    // coommit

   

})


const user = mongoose.models.interview || mongoose.model("interview", schema);
export default user;