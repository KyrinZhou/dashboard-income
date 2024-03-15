import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { getData } from '@/app/lib/data';
import { toPercent, toStrFormat } from '@/app/lib/utils';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const session = await auth();
  console.log(session?.user);
  const data = await getData(session?.user?.id);
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

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
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
