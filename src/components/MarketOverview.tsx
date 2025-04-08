
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const indexData = [
  { name: 'S&P 500', value: 4863.93, change: 1.02, changePercent: 0.02 },
  { name: 'Dow 30', value: 38239.66, change: 125.82, changePercent: 0.33 },
  { name: 'Nasdaq', value: 17597.08, change: -8.14, changePercent: -0.05 },
  { name: 'Russell 2000', value: 2028.97, change: 11.37, changePercent: 0.56 },
];

const MarketOverview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % indexData.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
          {indexData.map((index, idx) => (
            <div 
              key={index.name} 
              className="flex flex-col transform transition-all duration-700"
              style={{
                transform: `translateX(${(idx - activeIndex + indexData.length) % indexData.length * 5}%)`,
                animation: `slide-in 15s linear infinite ${idx * 0.5}s`
              }}
            >
              <div className="text-sm text-gray-500">{index.name}</div>
              <div className="text-lg font-bold">{index.value.toLocaleString()}</div>
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
      </CardContent>
      <style jsx>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </Card>
  );
};

export default MarketOverview;
