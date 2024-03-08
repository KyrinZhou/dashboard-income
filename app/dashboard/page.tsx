import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { getData, getUser } from '../lib/data';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  console.log(session?.user);

  const user = await getUser(session?.user?.id);
  console.log(user);
  const data = await getData(session?.user?.id);
  console.log(data);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        数据总览
      </h1>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
        <Card title="Collected" value={'12313'} type="collected" />
        <Card title="Pending" value={'231231'} type="pending" />
        <Card title="Total Invoices" value={'123123'} type="invoices" />
        <Card title="Total Customers" value={'12312'} type="customers" />
        <Card title="Total Customers" value={'12312'} type="customers" />
        <Card title="Total Customers" value={'12312'} type="customers" />
        <Card title="Total Customers" value={'12312'} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
