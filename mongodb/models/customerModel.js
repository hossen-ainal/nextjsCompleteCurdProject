import  mongoose  from "mongoose";
const {Schema} = mongoose ;

const customerSchema = new Schema({
    customerId:{
        type:String,
        required:true,
        unique:true
        },
        
        name:{
            type:String,
            required:true
            },      
        email:{
            type:String,
            required:true,
        },
      
        createdAt:{
            type:Date,
            required:true,
            default: Date.now()
        }
});

export const customerModel = mongoose.models.Customer ?? mongoose.model("Customer", customerSchema);