
// Generate random data for the charts
const generateChartData = (startValue: number, volatility: number = 0.03, dataPoints: number = 30) => {
  const data = [];
  let currentValue = startValue;
  
  for (let i = 0; i < dataPoints; i++) {
    // Random walk with fixed volatility
    const change = currentValue * volatility * (Math.random() - 0.5);
    currentValue += change;
    
    // For the mini charts, we only need the value
    data.push({ value: currentValue });
  }
  
  return data;
};

// Generate random data for the detailed chart with dates
const generateDetailedChartData = (startValue: number, volatility: number = 0.03, dataPoints: number = 30) => {
  const data = [];
  let currentValue = startValue;
  const today = new Date();
  
  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (dataPoints - i - 1));
    
    // Random walk with fixed volatility
    const change = currentValue * volatility * (Math.random() - 0.5);
    currentValue += change;
    
    data.push({ 
      date: `${date.getMonth() + 1}/${date.getDate()}`, 
      value: currentValue 
    });
  }
  
  return data;
};

export const mockStocks = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    price: 182.63,
    change: 2.42,
    changePercent: 1.34,
    chartData: generateChartData(182.63),
    volume: 67524200,
    marketCap: '$2.86T',
    peRatio: 28.42,
    dividend: 0.58,
    sector: 'Technology',
    openPrice: 180.73,
    highPrice: 183.21,
    lowPrice: 180.45,
    previousClose: 180.21,
    detailedChartData: generateDetailedChartData(182.63),
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    price: 421.90,
    change: 5.32,
    changePercent: 1.28,
    chartData: generateChartData(421.90),
    volume: 23648100,
    marketCap: '$3.14T',
    peRatio: 36.18,
    dividend: 0.72,
    sector: 'Technology',
    openPrice: 417.75,
    highPrice: 422.95,
    lowPrice: 416.43,
    previousClose: 416.58,
    detailedChartData: generateDetailedChartData(421.90),
  },
  {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    price: 172.11,
    change: 0.95,
    changePercent: 0.56,
    chartData: generateChartData(172.11),
    volume: 21542600,
    marketCap: '$2.16T',
    peRatio: 26.37,
    dividend: 0,
    sector: 'Technology',
    openPrice: 171.34,
    highPrice: 173.76,
    lowPrice: 170.85,
    previousClose: 171.16,
    detailedChartData: generateDetailedChartData(172.11),
  },
  {
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    price: 180.75,
    change: 1.63,
    changePercent: 0.91,
    chartData: generateChartData(180.75),
    volume: 37896500,
    marketCap: '$1.87T',
    peRatio: 60.25,
    dividend: 0,
    sector: 'Consumer Cyclical',
    openPrice: 179.92,
    highPrice: 181.52,
    lowPrice: 178.93,
    previousClose: 179.12,
    detailedChartData: generateDetailedChartData(180.75),
  },
  {
    symbol: 'META',
    companyName: 'Meta Platforms, Inc.',
    price: 474.96,
    change: 3.27,
    changePercent: 0.69,
    chartData: generateChartData(474.96),
    volume: 15729400,
    marketCap: '$1.21T',
    peRatio: 32.16,
    dividend: 0,
    sector: 'Technology',
    openPrice: 472.40,
    highPrice: 476.33,
    lowPrice: 471.26,
    previousClose: 471.69,
    detailedChartData: generateDetailedChartData(474.96),
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    price: 168.29,
    change: -4.73,
    changePercent: -2.73,
    chartData: generateChartData(168.29, 0.05),
    volume: 115894300,
    marketCap: '$534.46B',
    peRatio: 83.71,
    dividend: 0,
    sector: 'Automotive',
    openPrice: 172.63,
    highPrice: 173.05,
    lowPrice: 167.43,
    previousClose: 173.02,
    detailedChartData: generateDetailedChartData(168.29, 0.05),
  },
  {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    price: 881.86,
    change: -14.56,
    changePercent: -1.62,
    chartData: generateChartData(881.86, 0.04),
    volume: 42156700,
    marketCap: '$2.17T',
    peRatio: 73.92,
    dividend: 0.04,
    sector: 'Technology',
    openPrice: 898.34,
    highPrice: 899.45,
    lowPrice: 879.21,
    previousClose: 896.42,
    detailedChartData: generateDetailedChartData(881.86, 0.04),
  },
  {
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    price: 191.08,
    change: 0.87,
    changePercent: 0.46,
    chartData: generateChartData(191.08, 0.02),
    volume: 9546700,
    marketCap: '$551.15B',
    peRatio: 11.59,
    dividend: 2.45,
    sector: 'Financial Services',
    openPrice: 190.55,
    highPrice: 191.86,
    lowPrice: 190.06,
    previousClose: 190.21,
    detailedChartData: generateDetailedChartData(191.08, 0.02),
  },
  {
    symbol: 'V',
    companyName: 'Visa Inc.',
    price: 273.71,
    change: 1.34,
    changePercent: 0.49,
    chartData: generateChartData(273.71, 0.02),
    volume: 5462100,
    marketCap: '$559.54B',
    peRatio: 30.58,
    dividend: 0.84,
    sector: 'Financial Services',
    openPrice: 272.60,
    highPrice: 274.53,
    lowPrice: 272.14,
    previousClose: 272.37,
    detailedChartData: generateDetailedChartData(273.71, 0.02),
  },
  {
    symbol: 'WMT',
    companyName: 'Walmart Inc.',
    price: 59.58,
    change: -0.22,
    changePercent: -0.37,
    chartData: generateChartData(59.58, 0.02),
    volume: 12682400,
    marketCap: '$480.37B',
    peRatio: 31.20,
    dividend: 1.68,
    sector: 'Consumer Defensive',
    openPrice: 59.86,
    highPrice: 60.12,
    lowPrice: 59.41,
    previousClose: 59.80,
    detailedChartData: generateDetailedChartData(59.58, 0.02),
  },
  {
    symbol: 'JNJ',
    companyName: 'Johnson & Johnson',
    price: 147.53,
    change: -0.64,
    changePercent: -0.43,
    chartData: generateChartData(147.53, 0.01),
    volume: 6345800,
    marketCap: '$354.89B',
    peRatio: 9.25,
    dividend: 3.06,
    sector: 'Healthcare',
    openPrice: 148.13,
    highPrice: 148.42,
    lowPrice: 147.31,
    previousClose: 148.17,
    detailedChartData: generateDetailedChartData(147.53, 0.01),
  },
  {
    symbol: 'PG',
    companyName: 'The Procter & Gamble Company',
    price: 162.70,
    change: 1.28,
    changePercent: 0.79,
    chartData: generateChartData(162.70, 0.01),
    volume: 6572300,
    marketCap: '$383.53B',
    peRatio: 26.75,
    dividend: 2.47,
    sector: 'Consumer Defensive',
    openPrice: 161.65,
    highPrice: 163.21,
    lowPrice: 161.42,
    previousClose: 161.42,
    detailedChartData: generateDetailedChartData(162.70, 0.01),
  },
];

export default mockStocks;
