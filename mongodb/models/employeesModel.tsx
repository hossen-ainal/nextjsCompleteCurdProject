import  mongoose  from "mongoose";
import { Schema, model, connect } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
interface IEmployeeInfo {
  customerId:string,
  customerName: string;
  designation:string,
  department:string,
  email?: string;
}

// 2. Create a Schema corresponding to the document interface.
const EmployeeInfoSchema = new Schema<IEmployeeInfo>({
   customerId: { type: String, required: true },
   customerName: { type: String, required: true },
   designation: { type: String, required: true },
   department: { type: String, required: true },
   

});

// 3. Create a Model.
export const EmployeeInfo = mongoose.models.EmployeeInfo ?? mongoose.model<IEmployeeInfo>('EmployeeInfo', EmployeeInfoSchema);