import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';

export default function Form() {
  return (
    <form action={createCustomer}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer ID */}       
        <div className="mb-4">
          <label htmlFor="customerId" className="mb-2 block text-sm font-medium">
            Write customer ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerId"
                name="customerId"
                type="text"
                placeholder="Write customer ID"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>        
        </div>
        {/* Customer Name */}       
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Write customer name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customer"
                name="customerName"
                type="text"
                placeholder="Write customer name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>        
        </div>

         {/* Customer Designation */}       
        <div className="mb-4">
          <label htmlFor="designation" className="mb-2 block text-sm font-medium">
            Write customer Designation
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="designation"
                name="designation"
                type="text"
                placeholder="Write customer Designation"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>        
        </div>

           {/* Customer Department */}       
        <div className="mb-4">
          <label htmlFor="department" className="mb-2 block text-sm font-medium">
            Write customer Department
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="department"
                name="department"
                type="text"
                placeholder="Write customer Department"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>        
        </div>             
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
