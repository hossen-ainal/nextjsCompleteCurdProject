import  mongoose  from "mongoose";
const {Schema} = mongoose ;

const revenueSchema = new Schema({
    month:String,
  revenue:Number
});

export const revenueModel = mongoose.models.revenue ?? mongoose.model("revenue", revenueSchema);
