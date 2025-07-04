import  mongoose  from "mongoose";
const {Schema} = mongoose ;

const userSchema = new Schema({
    empId:{
        type:String,
        required:true,
        unique:true
        },
        
        name:{
            type:String,
            required:true
            },
        designation:{
            type:String,
            required:true,
        },
        
       department:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true

        },
        createdAt:{
            type:Date,
            required:true,
            default: Date.now()
        }
});

export const userModel = mongoose.models.User ?? mongoose.model("User", userSchema);