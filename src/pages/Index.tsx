import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import StockTile from '@/components/StockTile';
import StockDetailDialog from '@/components/StockDetailDialog';
import MarketOverview from '@/components/MarketOverview';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import mockStocks from '@/data/mockStocks';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, TrendingUp, DollarSign, Percent } from 'lucide-react';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStockClick = (stock) => {
    setSelectedStock({
      ...stock,
      chartData: stock.detailedChartData,
    });
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Smart Investing Starts with Better <span className="text-finance-blue">Stock Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover, analyze, and track top-performing stocks with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-finance-blue hover:bg-finance-darkBlue">
                Get Started — It's Free
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://placehold.co/600x400/e4f2ff/2563eb?text=Stock+Analytics+Dashboard" 
              alt="Stock Analytics Dashboard" 
              className="rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>
      
      {/* Market Overview Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <MarketOverview />
        </div>
      </section>
      
      {/* Stock Categories Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="trending">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Explore Stocks</h2>
              <TabsList>
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" /> Trending
                </TabsTrigger>
                <TabsTrigger value="gainers">
                  <Flame className="h-4 w-4 mr-2" /> Top Gainers
                </TabsTrigger>
                <TabsTrigger value="value">
                  <DollarSign className="h-4 w-4 mr-2" /> Value Picks
                </TabsTrigger>
                <TabsTrigger value="dividend">
                  <Percent className="h-4 w-4 mr-2" /> Dividend
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockStocks.slice(0, 8).map((stock) => (
                  <StockTile
                    key={stock.symbol}
                    symbol={stock.symbol}
                    companyName={stock.companyName}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                    chartData={stock.chartData}
                    onClick={() => handleStockClick(stock)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gainers" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockStocks
                  .slice()
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .filter(stock => stock.changePercent > 0)
                  .slice(0, 8)
                  .map((stock) => (
                    <StockTile
                      key={stock.symbol}
                      symbol={stock.symbol}
                      companyName={stock.companyName}
                      price={stock.price}
                      change={stock.change}
                      changePercent={stock.changePercent}
                      chartData={stock.chartData}
                      onClick={() => handleStockClick(stock)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="value" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockStocks
                  .slice()
                  .sort((a, b) => a.peRatio - b.peRatio)
                  .slice(0, 8)
                  .map((stock) => (
                    <StockTile
                      key={stock.symbol}
                      symbol={stock.symbol}
                      companyName={stock.companyName}
                      price={stock.price}
                      change={stock.change}
                      changePercent={stock.changePercent}
                      chartData={stock.chartData}
                      onClick={() => handleStockClick(stock)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="dividend" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockStocks
                  .slice()
                  .sort((a, b) => b.dividend - a.dividend)
                  .filter(stock => stock.dividend > 0)
                  .slice(0, 8)
                  .map((stock) => (
                    <StockTile
                      key={stock.symbol}
                      symbol={stock.symbol}
                      companyName={stock.companyName}
                      price={stock.price}
                      change={stock.change}
                      changePercent={stock.changePercent}
                      chartData={stock.chartData}
                      onClick={() => handleStockClick(stock)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">View All Stocks</Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <FeatureSection />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-finance-blue text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take your investing to the next level?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of investors who use StockTile to discover opportunities, analyze market trends, and make smarter investment decisions.
          </p>
          <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
            Create Free Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Stock Detail Dialog */}
      <StockDetailDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        stock={selectedStock} 
      />
    </div>
  );
};

export default Index;
