import  mongoose  from "mongoose";
import { EmployeeInfo } from "./employeesModel";
import { customerModel } from "@/mongodb/models/customerModel";
const {Schema} = mongoose ;

const invoiceSchema = new Schema(
    {
    amount:{type:Number},
    status:{type:String},
    // customerId:{type:String,required:true},
    customers:{
        type:Schema.Types.ObjectId,
        ref:"EmployeeInfo"
    }
    },
    {timestamps:true}
    );

export const invoiceModel = mongoose.models.invoice ?? mongoose.model("invoice", invoiceSchema);
