
import Form from '@/app/ui/customers/create-customer';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';


export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/invoices' },
          {
            label: 'Create Customer',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form />   
    </main>
  );
}