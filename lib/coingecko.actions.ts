'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

const BASE_URL_PRO = process.env.COINGECKO_PRO_URL;
const API_KEY_PRO = process.env.COINGECKO_PRO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `);
  }

  return response.json();
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null,
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>('/onchain/search/pools', { query: id });

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}

export async function toppers(revalidate = 60): Promise<TopGainersLosers | boolean> {
  const res = await fetch(`${BASE_URL_PRO}/ping`, {
    headers: {
      'x-cg-pro-api-key': API_KEY_PRO,
      'Content-Type': 'application/json',
    } as Record<string, string>,
  });

  if (!res.ok) return false;

  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL_PRO}/coins/top_gainers_losers?vs_currency=usd`,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      'x-cg-pro-api-key': API_KEY_PRO,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `);
  }

  return response.json();
}

export async function searchCoins(
  query: string,
  trendingCoins?: TrendingCoin[],
): Promise<SearchCoin[]> {
  // If no query is provided, return trending coins formatted as SearchCoin[]
  if (!query.trim()) {
    if (trendingCoins && trendingCoins.length > 0) {
      return trendingCoins.slice(0, 8).map(({ item }) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        market_cap_rank: item.market_cap_rank || null,
        thumb: item.thumb || '',
        large: item.large || '',
        data: {
          price: item.data?.price || 0,
          price_change_percentage_24h: item.data?.price_change_percentage_24h?.usd || 0,
        },
      }));
    }
    return [];
  }

  try {
    const coins = await fetch(`${BASE_URL}/search?query=${query}`, {
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
    });

    if (!coins.ok) {
      const errorBody = await coins.json().catch(() => ({}));
      throw new Error(`Search API Error: ${coins.status}: ${errorBody.error || coins.statusText}`);
    }

    const coinsData = await coins.json();
    const searchCoins = (coinsData.coins || []).slice(0, 10);

    // Fetch detailed data for each coin in parallel
    const searchResults = await Promise.all(
      searchCoins.map(async (coin: any) => {
        try {
          const data = await fetcher<CoinDetailsData>(`coins/${coin.id}`);
          return {
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            market_cap_rank: data.market_cap_rank,
            thumb: coin.thumb || data.image?.small || '',
            large: coin.large || data.image?.large || '',
            data: {
              price: data.market_data?.current_price?.usd || 0,
              price_change_percentage_24h:
                data.market_data?.price_change_percentage_24h_in_currency?.usd || 0,
            },
          };
        } catch (error) {
          console.error(`Failed to fetch details for coin ${coin.id}:`, error);
          // Return basic search result if detailed fetch fails
          return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            market_cap_rank: coin.market_cap_rank || null,
            thumb: coin.thumb || '',
            large: coin.large || '',
            data: {
              price: 0,
              price_change_percentage_24h: 0,
            },
          };
        }
      }),
    );

    return searchResults;
  } catch (error) {
    console.error('Search coins error:', error);
    return [];
  }
}
