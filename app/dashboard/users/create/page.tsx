import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { CustomerField } from '@/app/lib/definitions';

export default async function Page() {
  //   const customers = await fetchCustomers();
  const customers: CustomerField[] = [];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '用户管理', href: '/dashboard/users' },
          {
            label: '用户创建',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
