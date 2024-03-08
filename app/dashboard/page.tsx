import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { getData, getUser } from '../lib/data';
import { auth } from '@/auth';
import { toPercent, toStrFormat } from '../lib/utils';

export default async function Page() {
  const session = await auth();
  console.log(session?.user);
  const data = await getData(session?.user?.id);
  console.log(data);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        数据总览
      </h1>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
        <Card
          title="广告请求PV"
          value={toStrFormat(data?.ad_request_pv || 0)}
          type="collected"
        />
        <Card
          title="曝光PV"
          value={toStrFormat(data?.exposure_pv || 0)}
          type="pending"
        />
        <Card
          title="点击PV"
          value={toStrFormat(data?.click_pv || 0)}
          type="invoices"
        />
        <Card
          title="点击率"
          value={toPercent(data?.click_rate || 0, 4)}
          type="customers"
        />
        <Card
          title="ECPM"
          value={toStrFormat(data?.ecpm || 0, 1)}
          type="customers"
        />
        <Card
          title="广告收入"
          value={toStrFormat(data?.income || 0)}
          type="customers"
        />
        <Card
          title="分销收入"
          value={toStrFormat(data?.total_income || 0)}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
