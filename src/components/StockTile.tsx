
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockTileProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  chartData: Array<{ value: number }>;
  onClick: () => void;
}

const StockTile: React.FC<StockTileProps> = ({
  symbol,
  companyName,
  price,
  change,
  changePercent,
  chartData,
  onClick,
}) => {
  const isPositive = change >= 0;
  const changeClass = isPositive ? 'stock-up' : 'stock-down';
  const chartClass = isPositive ? 'mini-chart-up' : 'mini-chart-down';
  
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 h-full"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{symbol}</h3>
          <p className="text-sm text-gray-500 truncate max-w-[180px]">{companyName}</p>
        </div>
        <div className={cn("flex flex-col items-end", changeClass)}>
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <div className="flex items-center text-sm">
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>${Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)</span>
          </div>
        </div>
      </div>
      
      <div className="h-16 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#22c55e" : "#ef4444"} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false}
              className={chartClass}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StockTile;
