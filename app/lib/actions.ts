"use server"
import { z } from 'zod';
import connectDB from "@/mongodb/connectDB"
import { customerModel } from "@/mongodb/models/customerModel";
import { EmployeeInfo } from "@/mongodb/models/employeesModel";
import { invoiceModel } from "@/mongodb/models/invoiceModel";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

 const FormSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  customerName: z.string(),
  amount: z.number(),
  status:z.string(),
});

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData:FormData){
    try {
    connectDB();
 
    const rawFormData = {
    customers:formData.get("customers"),
    amount:formData.get("amount"),
    status:formData.get("status")
   }
  
   const RawFormData = new invoiceModel(rawFormData);
 
   await RawFormData.save();

    } catch (error:any) {
        throw new Error(error.message)
    }
     revalidatePath('/dashboard/invoices');
     redirect('/dashboard/invoices');
 
};

export async function updateInvoice(id: string, formData:FormData){
    try {
    connectDB();
    const rawData = UpdateInvoice.parse({
      customerName: formData.get('customerName'),
      amount: Number(formData.get('amount')),
      status: formData.get('status'),
  });
 

  //   const rawFormData = {
  //   customers:formData.get("customers"),
  //   amount:formData.get("amount"),
  //   status:formData.get("status")
  //  }

  //  console.log(typeof rawFormData.amount);

  await  invoiceModel.findByIdAndUpdate(id, {$set : {amount:rawData.amount, status:rawData.status}});
 
 

    } catch (error:any) {
        throw new Error(error.message)
    }
     revalidatePath('/dashboard/invoices');
     redirect('/dashboard/invoices');
 
};


export async function deleteInvoice(id:string, formData:FormData) {
  try {
    connectDB();
    await invoiceModel.findByIdAndDelete(id);
    revalidatePath('/dashboard/invoices');

  } catch (error:any) {
    throw new Error(error.message)
  }
}




export async function createCustomer(formData:FormData){
try {
    connectDB();
      
//    const  customerId = formData.get("customerId");
//    const customerName=formData.get("customerName");
//    const designation=formData.get("designation");
//    const department=formData.get("department");

   const rawFormData = {
    customerId : formData.get("customerId"),
    customerName:formData.get("customerName"),
    designation:formData.get("designation"),
    department:formData.get("department")
   }
  
   const RawFormData = new EmployeeInfo(rawFormData);
   await RawFormData.save();

    // const EmployeeInfoData = new EmployeeInfoModel(
    //     {
    //     customerId,customerName,designation,department
    //     }
    // )

//   await EmployeeInfoData.save();

} catch (error:any) {
    throw new Error(error.message)
}
};

export async function fetchCustomers() {
   try {
    connectDB();
    const FetchCustomers = await EmployeeInfo.find();
    return FetchCustomers;
   } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch customers")
   } 
}

export async function fetchInvoiceData() {
   try {
    connectDB();
    const FetchInvoiceData = await invoiceModel.find({}).populate('customers');
    return FetchInvoiceData;
   } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch customers")
   } 
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
// start own code
  try {
    connectDB();
    const FetchInvoiceData = await invoiceModel.find({}).populate('customers').exec();
    return FetchInvoiceData;
    
  } catch (error) {
    console.error("Database Error: ", error)
    throw new Error("Failed to fetch invoices")
  }
// end own code

  // ********* start original code ******
  // try {
  //   const invoices = await sql<InvoicesTable[]>`
  //     SELECT
  //       invoices.id,
  //       invoices.amount,
  //       invoices.date,
  //       invoices.status,
  //       customers.name,
  //       customers.email,
  //       customers.image_url
  //     FROM invoices
  //     JOIN customers ON invoices.customer_id = customers.id
  //     WHERE
  //       customers.name ILIKE ${`%${query}%`} OR
  //       customers.email ILIKE ${`%${query}%`} OR
  //       invoices.amount::text ILIKE ${`%${query}%`} OR
  //       invoices.date::text ILIKE ${`%${query}%`} OR
  //       invoices.status ILIKE ${`%${query}%`}
  //     ORDER BY invoices.date DESC
  //     LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  //   `;
  //   return invoices;
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoices.');
  // }

  // ********* end original code ******
}


