"use server"

import { userModel } from "@/mongodb/models/userModel";
import { customerModel } from "@/mongodb/models/customerModel";
import { invoiceModel } from "@/mongodb/models/invoiceModel";
import { revenueModel } from "@/mongodb/models/revenueModel";
import connectDB from "@/mongodb/connectDB"
import { revalidatePath } from "next/cache";

export const  getUsers = async() =>{
    try {
        connectDB();
        const usersData = await userModel.find();
        return usersData;
      revalidatePath("/loginPage");   
    } catch (error) {
        throw new Error(error.message)
    }
  
}

export const  getCustomers = async() =>{
    try {
        connectDB();
        const customersData = await customerModel.find();
       const cName = customersData.map((customer)=>(customer.name));     
        return cName;  
    } catch (error) {
        throw new Error(error.message)
    }
  
}

export const  getInvoice = async() =>{
    try {
        connectDB();
        const invoiceData = await invoiceModel.find();
        return invoiceData;  
    } catch (error) {
        throw new Error(error.message)
    }
  
}

export const  getRevenue = async() =>{
    try {
        connectDB();
        const revenueData = await revenueModel.find();
        return revenueData;  
    } catch (error) {
        throw new Error(error.message)
    }
  
}


export const  fetchCardData = async() =>{
    try {
        connectDB();
        const totalCustomerModel = await customerModel.aggregate([{$count:"Total"}]);
        const totalInvoice = await invoiceModel.aggregate([{$count:"Total"}]);

        const totalCustomer = await invoiceModel.aggregate([{$group:{_id:"$customer_id"}},
            {$count:"Total"}]);

            const totalAmount = await invoiceModel.aggregate([{$group:{_id:null,  totalAmount:{$sum:"$amount"}}}]);

        const totalInvoiceResult  = totalInvoice.length > 0 ? totalInvoice[0].Total : 0;
        const totalCustomerResult  = totalCustomer.length > 0 ? totalCustomer[0].Total : 0;
        const totalNoOfCustomer  = totalCustomerModel.length > 0 ? totalCustomerModel[0].Total : 0;
        
        

        return {
            totalInvoiceResult,
            totalCustomerResult,
            totalAmount,
            totalNoOfCustomer
        };  
    } catch (error) {
        throw new Error(error.message)
    }
  
}