import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '../DataTable';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingCoinFallback } from './fallback';

const TrendingCoin = async () => {
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Coin',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coins/${item.id}`} className="flex items-center gap-3">
            <Image src={item.large} alt={item.name} width={36} height={36} className="" />
            <p>{item.name}</p>
          </Link>
        );
      },
      cellClassName: 'name-cell',
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p className="flex gap-1 items-center">
              {formatPercentage(item.data.price_change_percentage_24h.usd)}%
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}{' '}
            </p>
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];
  let trendingCoins;
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin }>('search/trending', undefined, 300);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return <TrendingCoinFallback />;
  }

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 10) || []}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoin;
