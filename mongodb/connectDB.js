const mongoose = require('mongoose');

 const connectDB =()=>{
    try {
      mongoose.connect('mongodb+srv://dapfcl:dapfcl@cluster0.duj8xld.mongodb.net/dapfcl');
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.log(error);
      throw new Error("MongoDB connection failed");
    }
}

export default connectDB;