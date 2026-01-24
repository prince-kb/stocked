import { fetcher, searchCoins } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { CoinOverviewFallback } from './fallback';
import CandleStickChart from '../CandleStickChart';

const CoinOverview = async () => {
  let coin: CoinDetailsData | null = null;
  let coinOHLCData: OHLCData[] = [];

  try {
    const [coinRes, ohlcRes] = await Promise.all([
      fetcher<CoinDetailsData>('coins/bitcoin', {
        dex_pair_format: 'symbol',
      }),
      fetcher<OHLCData[]>('coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,
        precision: 'full',
      }),
    ]);
    coin = coinRes;
    coinOHLCData = ohlcRes || [];
  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coin?.image?.large}
            alt={coin?.name}
            width={56}
            height={56}
            className="h-8 w-auto"
          />
          <div className="info">
            <p>
              {coin?.name ?? '—'}
              {coin?.symbol ? ` / ${coin.symbol.toUpperCase()}` : ''}
            </p>
            <h1>{formatCurrency(coin?.market_data?.current_price?.usd ?? 0)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
