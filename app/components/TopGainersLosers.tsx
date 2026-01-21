'use client';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { useState } from 'react';
import DataTable from './DataTable';
import Link from 'next/link';
import Image from 'next/image';

const TopGainersLosers = ({ toppersData }: any) => {
  const [client, setClient] = useState<'Gainers' | 'Losers'>('Gainers');
  const topperColumns: DataTableColumn<Toppers>[] = [
    {
      header: 'Symbol',
      cellClassName: '',
      cell: (toppersData) => (
        <Image
          src={toppersData.image}
          alt={toppersData.name}
          height={20}
          width={20}
          className="w-10 h-auto"
        />
      ),
    },
    {
      header: 'Name',
      cellClassName: ' font-semibold',
      cell: (toppersData) => (
        <Link href={`/coins/${toppersData.id}`}>
          {toppersData.name.length > 20 ? toppersData.name.slice(0, 20) + '...' : toppersData.name}{' '}
          ({toppersData.symbol})
        </Link>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'font-semibold',
      cell: (toppersData) => (toppersData.usd ? formatCurrency(toppersData.usd) : '-'),
    },
    {
      header: 'Volume',
      cellClassName: 'font-semibold',
      cell: (toppersData) => toppersData.usd_24h_vol.toFixed(2),
    },
    {
      header: 'Change',
      cellClassName: 'font-semibold',
      cell: (toppersData) => {
        const isTrendingUp = toppersData.usd_24h_change >= 0;

        return (
          <span
            className={cn('change-value', {
              'text-green-600': isTrendingUp,
              'text-red-500': !isTrendingUp,
            })}
          >
            {isTrendingUp && '+'}
            {formatPercentage(toppersData.usd_24h_change)}
          </span>
        );
      },
    },
  ];

  return (
    <div id="top-gainers-losers">
      <h4 className=" mb-2 pb-3 text-xl font-semibold md:text-2xl">Top Gainers / Losers</h4>
      <div className="flex gap-2 justify-around mb-4">
        <button
          value="Gainers"
          onClick={() => setClient('Gainers')}
          className={cn(
            'border-2 rounded-2xl px-4 py-2 font-medium cursor-pointer w-1/3',
            client === 'Gainers' && 'border-green-600',
          )}
        >
          Gainers
        </button>
        <button
          value="Losers"
          onClick={() => setClient('Losers')}
          className={cn(
            'border-2 rounded-2xl px-4 py-2 font-medium cursor-pointer w-1/3',
            client === 'Losers' && 'border-green-600',
          )}
        >
          Losers
        </button>
      </div>

      <DataTable
        columns={topperColumns}
        data={
          client === 'Gainers'
            ? toppersData.top_gainers.slice(0, 10)
            : toppersData.top_losers.slice(0, 10) || []
        }
        rowKey={(_, index) => index}
        headerRowClassName="rounded-xl"
        tableClassName=""
        bodyRowClassName="bg-gray-700/50 border-b"
      />
    </div>
  );
};

export default TopGainersLosers;
