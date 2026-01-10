import { Suspense } from 'react';
import CoinOverview from './components/home/CoinOverview';
import TrendingCoin from './components/home/TrendingCoin';
import { CoinOverviewFallback, TrendingCoinFallback } from './components/home/fallback';

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinFallback />}>
          <TrendingCoin />
        </Suspense>
      </section>
      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default page;
