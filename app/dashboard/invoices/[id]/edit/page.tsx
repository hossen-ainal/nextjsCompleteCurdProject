import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
 
export default async function Page(props:{params:Promise<{id: string}>}) {

    const params = await props.params;
    const id = params.id;

    const invoiceData = await fetchInvoiceById(id);

// console.log(invoiceData);

  //  const [invoiceData, customersData] = await Promise.all([
  //       fetchInvoiceById(id),
  //       fetchCustomers().populate('customers','customerName'),
  //  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice ={invoiceData} />
    </main>
  );
}