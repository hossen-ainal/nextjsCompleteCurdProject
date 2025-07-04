//  [ Server ] Error: Operation `invoices.find()` buffering timed out after 10000ms

// solve: উপররে েইরর টি দেখায়  সার্ভার েএর সাথে কানেক্ট না থাকলে অথ্যা? ট্রােই ক্যাশ ব্লকে েএই  connectDB();
// কল করতে হবে।

// [ Server ] Error: Cannot read properties of null (reading 'map')

//  
// (3. Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
//   {_id: ..., amount: 4666, status: ..., customers: {buffer: ...}, createdAt: ..., updatedAt: ..., __v: ...}
// 3. no bhult shudhu matra Id er jono hocche)

🧵 Step-by-Step: Mongoose দিয়ে কাস্টমার ইনফো ফেচ (API ছাড়া)
✅ Mongoose Query (Server Side Code):
ts
import mongoose from 'mongoose';
import { invoiceModel } from '@/models/invoice';

const getInvoiceCustomer = async () => {
  await mongoose.connect(process.env.MONGODB_URI); // নিশ্চিত করো এটা একবারই রান হয়

  const invoiceId = '68411c1d416b05abba8f054c'; // এইটা তুমি Dynamic ভাবে নিতে পারো
  const invoice = await invoiceModel
    .findById(invoiceId)
    .populate('customers'); // EmployeeInfo রেফারেন্স

  if (!invoice) {
    console.log('Invoice not found');
    return;
  }

  const customerName = invoice.customers?.name;
  console.log('Customer Name:', customerName);
};
📦 Ensure EmployeeInfo Model is Connected:
ts
const employeeInfoSchema = new Schema({
  name: String,
  department: String,
  // অন্যান্য ফিল্ড...
});

export const employeeModel =
  mongoose.models.EmployeeInfo ?? mongoose.model('EmployeeInfo', employeeInfoSchema);
🧪 Test করার জন্য একটা utility ফাইল বানাতে পারো:
ts
// utils/testCustomerFetch.ts
import { getInvoiceCustomer } from './getInvoiceCustomer';
getInvoiceCustomer();
⚠️ যেটা মাথায় রাখতে হবে:
এই কোড Server-side context এ চলবে — যেমন Next.js এর /app route বা getServerSideProps() এর ভিতরে

এটা API এর বিকল্প, কিন্তু কখনো UI থেকে সরাসরি এমন Query করা যায় না unless তুমি Server Components ইউজ করো বা Node.js এর স্ক্রিপ্ট রান করো

তুমি চাইলে আমি এটা getServerSideProps, app route, বা server actions এর ভিতর ব্যবহার করার সেরা পদ্ধতিটাও সাজিয়ে দিতে পারি। কোনটা ব্যবহার করছো এখন? 😊




 ## start error
// [ Server ] Error: Cannot read properties of undefined (reading 'count') সমাধান করুন

// 🛠️ এই error message—Cannot read properties of undefined (reading 'count')—বোঝায় যে তুমি undefined কোনো object-এর মধ্যে থেকে count property access করার চেষ্টা করছো। চলো ধাপে ধাপে এটা ব্যাখ্যা করে সমাধানে যাই:

// 🔍 সমস্যাটি কী?
// ts
// console.log(data.count);
// এখানে data যদি undefined হয়, তাহলে JavaScript রেগে যাবে 😤 কারণ তুমি এমন কিছু থেকে property নিতে চাচ্ছো যেটা অস্তিত্বই নেই।

// 🧠 সম্ভাব্য কারণগুলো:
// Database থেকে fetch করা object পাওয়া যায়নি

// ts
// const data = await Collection.findOne({ _id: someId });
// // যদি কিছু না মিলে, data হবে undefined
// API response structure ভুল

// ts
// const res = await fetch(...);
// const data = res.data; // কিন্তু হয়তো ঠিকভাবে JSON parse করোনি
// Optional chaining ব্যবহার করোনি

// ts
// console.log(data?.count); // এটা safe হবে
// ✅ সমাধান কৌশল:
// 1. Check for undefined:
// ts
// if (data) {
//   console.log(data.count);
// } else {
//   console.error("Data is undefined!");
// }
// 2. Optional Chaining:
// ts
// console.log(data?.count); // যদি data না থাকে, result হবে undefined
// 3. Default Value ব্যবহার করো:
// ts
// console.log(data?.count ?? 0); // যদি না থাকে, তাহলে 0 দেখাবে
// 4. Debugging Tip:
// Console লগ দিয়ে বুঝে নাও data আসলেই আছে কি না:

// ts
// console.log("Data received:", data);
// 🚀 Bonus: Next.js API বা MongoDB context-এ
// তুমি accounts app-এ কাজ করছো বলে ধরছি, যেখানে count হতে পারে document সংখ্যা বা child account সংখ্যা। এই ক্ষেত্রে:

// ts
// const doc = await Account.findOne({ code: "1001" });
// if (!doc) throw new Error("Account not found");
// console.log(doc.count);
// 📦 অথবা যদি count nested field হয়:

// ts
// console.log(doc?.meta?.count ?? 0);
// তুমি চাইলে তোমার প্রকৃত কোড স্নিপেট দিলে আমি pinpoint করে বলতে পারি ঠিক কোন লাইনে issue হচ্ছে। চেষ্টা করবে কি? 😊
## end error