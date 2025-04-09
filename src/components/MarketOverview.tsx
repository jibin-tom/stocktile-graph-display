
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const indexData = [
  { 
    name: 'S&P 500', 
    value: 4863.93, 
    change: 1.02, 
    changePercent: 0.02,
    url: 'https://www.spglobal.com/spdji/en/indices/equity/sp-500/'
  },
  { 
    name: 'Dow 30', 
    value: 38239.66, 
    change: 125.82, 
    changePercent: 0.33,
    url: 'https://www.spglobal.com/spdji/en/indices/equity/dow-jones-industrial-average/'
  },
  { 
    name: 'Nasdaq', 
    value: 17597.08, 
    change: -8.14, 
    changePercent: -0.05,
    url: 'https://www.nasdaq.com/'
  },
  { 
    name: 'Russell 2000', 
    value: 2028.97, 
    change: 11.37, 
    changePercent: 0.56,
    url: 'https://www.ftserussell.com/products/indices/russell-2000'
  },
  { 
    name: 'Nifty 50', 
    value: 22055.20, 
    change: 162.78, 
    changePercent: 0.74,
    url: 'https://www.nseindia.com/products-services/indices-nifty50-index'
  },
  { 
    name: 'Shanghai', 
    value: 3032.63, 
    change: -22.73, 
    changePercent: -0.74,
    url: 'https://www.sse.com.cn/assortment/stock/list/share/'
  },
];

const MarketOverview: React.FC = () => {
  const isMobile = useIsMobile();
  
  const handleOpenMarket = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Market Overview
      </h2>
      
      <Card className="flex-1 overflow-hidden bg-white shadow-md border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
        <CardContent className={`p-4 ${isMobile ? 'px-2' : 'px-4'}`}>
          <div className="overflow-hidden">
            <div className={`flex space-x-4 animate-market-scroll ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
              {[...indexData, ...indexData].map((index, idx) => (
                <div 
                  key={`${index.name}-${idx}`}
                  className={`flex-none ${isMobile ? 'min-w-[140px]' : 'min-w-[180px]'} bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer hover:bg-blue-50`}
                  onClick={() => handleOpenMarket(index.url)}
                >
                  <div className={`${isMobile ? 'text-sm' : 'text-md'} font-semibold text-gray-800`}>{index.name}</div>
                  <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>{index.value.toLocaleString()}</div>
                  <div className={cn(
                    "flex items-center text-sm",
                    index.change >= 0 ? "stock-up" : "stock-down"
                  )}>
                    {index.change >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    <span>{Math.abs(index.change).toFixed(2)} ({Math.abs(index.changePercent).toFixed(2)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <style>
          {`
            @keyframes market-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            .animate-market-scroll {
              display: flex;
              animation: market-scroll ${isMobile ? '20s' : '30s'} linear infinite;
            }

            @media (max-width: 768px) {
              .animate-market-scroll:hover {
                animation-play-state: paused;
              }
            }
          `}
        </style>
      </Card>
    </div>
  );
};

export default MarketOverview;
