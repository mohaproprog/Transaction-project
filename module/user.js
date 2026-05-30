import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { string } from "zod";

const userScheme = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profilePic:{
        type:String,
        default:null
    }
})
userScheme.pre("save",async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userScheme.methods.comparePassword = function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}
const user = mongoose.model("User",userScheme);
export default user