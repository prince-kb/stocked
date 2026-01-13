import DataTable from '../DataTable';

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image" />
        <div className="info">
          <div className="header-line-lg" />
          <div className="header-line-sm" />
          <div className="mt-2 flex gap-2">
            <div className="period-button-skeleton" />
            <div className="period-button-skeleton" />
            <div className="period-button-skeleton" />
          </div>
        </div>
      </div>

      <div className="chart mt-4">
        <div className="chart-skeleton" />
      </div>
    </div>
  );
}

export function TrendingCoinFallback() {
  const columns = [
    {
      header: 'Coin',
      cell: () => (
        <div className="name-cell">
          <div className="name-link">
            <div className="name-image" />
            <div className="name-line" />
          </div>
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="change-cell">
          <div className="change-line" />
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => (
        <div className="price-cell">
          <div className="price-line" />
        </div>
      ),
    },
  ];

  const rows = Array.from({ length: 8 }).map((_, i) => ({ id: i }));

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={rows}
        columns={columns}
        rowKey={(_, i) => String(i)}
        tableClassName="trending-coins-table"
      />
    </div>
  );
}

export function CategoriesFallback() {
  const columns: DataTableColumn<{ id: number }>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => <div className="category-line" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-2">
          <div className="image-skeleton" style={{ width: 28, height: 28 }} />
          <div className="image-skeleton" style={{ width: 28, height: 28 }} />
          <div className="image-skeleton" style={{ width: 28, height: 28 }} />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-header-cell',
      cell: () => <div className="change-line" />,
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="market-cap-line" />,
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: () => <div className="volume-line" />,
    },
  ];

  const rows = Array.from({ length: 10 }).map((_, i) => ({ id: i }));

  return (
    <div id="categories-fallback" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        data={rows}
        columns={columns}
        rowKey={(_, i) => String(i)}
        tableClassName="mt-3"
      />
    </div>
  );
}

