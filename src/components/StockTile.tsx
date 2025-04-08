
import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-300 h-full
                 hover:shadow-xl border-2 ${isHovered ? (isPositive ? 'border-finance-green' : 'border-finance-red') : 'border-transparent'}
                 transform ${isHovered ? 'scale-105' : 'scale-100'}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? `0 10px 25px -5px ${isPositive ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}` 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`text-lg font-bold ${isHovered ? 'transform translate-y-[-2px] transition-transform duration-300' : ''}`}>{symbol}</h3>
          <p className="text-sm text-gray-500 truncate max-w-[180px]">{companyName}</p>
        </div>
        <div className={cn("flex flex-col items-end", changeClass)}>
          <span className={`text-lg font-bold ${isHovered ? 'scale-110 transition-transform duration-300' : ''}`}>
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center text-sm">
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>${Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)</span>
          </div>
        </div>
      </div>
      
      <div className={`h-16 mt-2 ${isHovered ? 'animate-pulse' : ''}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#22c55e" : "#ef4444"} 
              strokeWidth={isHovered ? 3 : 2} 
              dot={false}
              isAnimationActive={true}
              className={chartClass}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StockTile;
