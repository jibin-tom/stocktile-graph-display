
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';
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
  
  // Find min and max values for the chart
  const minValue = Math.min(...chartData.map(d => d.value)) * 0.995;
  const maxValue = Math.max(...chartData.map(d => d.value)) * 1.005;
  
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
      
      <div className={`h-20 mt-2 ${isHovered ? 'animate-pulse' : ''}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <defs>
              <linearGradient id={`gradientUp-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id={`gradientDown-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            {isHovered && (
              <>
                <XAxis hide={true} />
                <YAxis hide={true} domain={[minValue, maxValue]} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Price']}
                  labelFormatter={() => ''}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: isPositive ? '#22c55e' : '#ef4444',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
              </>
            )}
            <ReferenceLine 
              y={chartData[0].value} 
              stroke={isPositive ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"} 
              strokeDasharray="3 3" 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#22c55e" : "#ef4444"} 
              strokeWidth={isHovered ? 3 : 2} 
              dot={false}
              isAnimationActive={true}
              className={chartClass}
              fill={isHovered ? `url(#gradient${isPositive ? 'Up' : 'Down'}-${symbol})` : 'none'}
              activeDot={{ r: 4, stroke: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 2, fill: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StockTile;
