
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, Info, TrendingUp, BarChart3, Calendar, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface StockDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stock: {
    symbol: string;
    companyName: string;
    price: number;
    change: number;
    changePercent: number;
    chartData: Array<{ date: string; value: number }>;
    volume: number;
    marketCap: string;
    peRatio: number;
    dividend: number;
    sector: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    previousClose: number;
  } | null;
}

const StockDetailDialog: React.FC<StockDetailDialogProps> = ({
  open,
  onOpenChange,
  stock,
}) => {
  const isMobile = useIsMobile();
  
  if (!stock) return null;

  const isPositive = stock.change >= 0;
  const changeClass = isPositive ? 'stock-up' : 'stock-down';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-3xl", isMobile ? "w-[95vw] p-3" : "w-[90vw]")}>
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold">{stock.symbol}</DialogTitle>
              <DialogDescription className="text-base sm:text-lg">{stock.companyName}</DialogDescription>
            </div>
            <div className={cn("flex flex-col items-start sm:items-end mt-2 sm:mt-0", changeClass)}>
              <span className="text-xl sm:text-2xl font-bold">${stock.price.toFixed(2)}</span>
              <div className="flex items-center">
                {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="chart" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="chart"><TrendingUp className="h-4 w-4 mr-2 hidden sm:inline" /> Chart</TabsTrigger>
            <TabsTrigger value="stats"><BarChart3 className="h-4 w-4 mr-2 hidden sm:inline" /> Stats</TabsTrigger>
            <TabsTrigger value="about"><Info className="h-4 w-4 mr-2 hidden sm:inline" /> About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stock.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickMargin={10}
                  tickFormatter={(value) => isMobile ? value.split(' ')[0] : value}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickMargin={5}
                  width={40}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 p-2 sm:p-4">
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Clock className="h-4 w-4 mr-1" /> Open
                </div>
                <div className="text-lg font-medium">${stock.openPrice.toFixed(2)}</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <ArrowUp className="h-4 w-4 mr-1" /> High
                </div>
                <div className="text-lg font-medium">${stock.highPrice.toFixed(2)}</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <ArrowDown className="h-4 w-4 mr-1" /> Low
                </div>
                <div className="text-lg font-medium">${stock.lowPrice.toFixed(2)}</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4 mr-1" /> Prev Close
                </div>
                <div className="text-lg font-medium">${stock.previousClose.toFixed(2)}</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <BarChart3 className="h-4 w-4 mr-1" /> Volume
                </div>
                <div className="text-lg font-medium">{stock.volume.toLocaleString()}</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" /> Market Cap
                </div>
                <div className="text-lg font-medium">{stock.marketCap}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="space-y-4 p-2 sm:p-4">
              <div>
                <h3 className="font-medium mb-1">Sector</h3>
                <p>{stock.sector}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">P/E Ratio</h3>
                <p>{stock.peRatio.toFixed(2)}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Dividend Yield</h3>
                <p>{stock.dividend.toFixed(2)}%</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">About {stock.companyName}</h3>
                <p className="text-gray-600">
                  This is a placeholder for the company description. In a real application, 
                  this would contain actual information about {stock.companyName}, including 
                  their business model, history, recent developments, and other relevant information 
                  for investors.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">Close</Button>
          <Button className="w-full sm:w-auto">Add to Watchlist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailDialog;
