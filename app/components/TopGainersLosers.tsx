'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const TopGainersLosers = () => {
  const [client, setClient] = useState<'Gainers' | 'Losers'>('Gainers');

  return (
    <div id="top-gainers-losers">
      <h4 className=" mb-2 pb-3 text-xl font-semibold md:text-2xl">Top Gainers / Losers</h4>
      <div className="tabs-list flex gap-2"></div>
    </div>
  );
};

export default TopGainersLosers;
