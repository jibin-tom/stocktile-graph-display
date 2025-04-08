import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import StockTile from '@/components/StockTile';
import StockDetailDialog from '@/components/StockDetailDialog';
import MarketOverview from '@/components/MarketOverview';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import mockStocks from '@/data/mockStocks';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, TrendingUp, DollarSign, Percent } from 'lucide-react';
import AuthDialog from '@/components/auth/AuthDialog';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const navigate = useNavigate();
  
  const gradientColors = [
    'from-blue-600 via-finance-blue to-purple-600',
    'from-yellow-500 via-orange-500 to-red-500',
    'from-green-500 via-teal-500 to-cyan-500',
    'from-pink-500 via-purple-500 to-indigo-500',
    'from-indigo-600 via-violet-600 to-purple-600'
  ];

  useEffect(() => {
    setTitleAnimation(true);
    
    const animationInterval = setInterval(() => {
      setTitleAnimation(false);
      setTimeout(() => setTitleAnimation(true), 200);
    }, 5000);
    
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % gradientColors.length);
    }, 7000);
    
    return () => {
      clearInterval(animationInterval);
      clearInterval(colorInterval);
    };
  }, []);

  const handleStockClick = (stock) => {
    setSelectedStock({
      ...stock,
      chartData: stock.detailedChartData,
    });
    setDialogOpen(true);
  };

  const handleGetStarted = () => {
    setAuthDialogOpen(true);
  };

  const handleHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 transition-all duration-700 ${titleAnimation ? 'opacity-100 translate-y-0 scale-105' : 'opacity-90 -translate-y-1 scale-100'}`}>
              Smart Investing Starts with Better{' '}
              <span className={`bg-gradient-to-r ${gradientColors[colorIndex]} bg-clip-text text-transparent transition-colors duration-1000`}
                style={{
                  animation: "pulse 3s infinite"
                }}>
                Stocking Insights
              </span>{' '}
              <span className="relative inline-block">
                by Sachin
              </span>
            </h1>
            <p className={`text-xl text-gray-600 mb-8 transition-all duration-700 delay-300 ${titleAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              Discover, analyze, and track top-performing stocks with our intuitive platform.
            </p>
            <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-500 ${titleAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button size="lg" className="bg-finance-blue hover:bg-finance-darkBlue transform hover:scale-105 transition-all duration-300" onClick={handleGetStarted}>
                Get Started — It's Free
              </Button>
              <Button size="lg" variant="outline" className="transform hover:scale-105 transition-all duration-300" onClick={handleHowItWorks}>
                See How It Works
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-center relative">
            <div className="absolute inset-0 rounded-lg animate-rainbow-trail"></div>
            <img 
              src="/lovable-uploads/d5af928d-133e-4280-8b4f-0390db8a01d0.png" 
              alt="Stock trader with sunglasses" 
              className={`rounded-lg max-w-full h-auto shadow-lg transition-all duration-1000 relative z-10 ${titleAnimation ? 'opacity-100 scale-100 rotate-0' : 'opacity-90 scale-95 rotate-1'}`}
              style={{ maxHeight: "350px" }}
            />
            <p className={`text-lg mt-4 font-bold text-center px-4 transition-all duration-700 delay-700 ${titleAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              സ്റ്റോക്കിങ്ങ് എന്താണെന്ന് അറിയോo ചെയ്യാം, അതിൽ പൈസ ഇട്ടിട്ടുമുണ്ട് പൈസ പോയിട്ടുമുണ്ട്....
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">Market Overview</h2>
          <MarketOverview />
        </div>
      </section>
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="trending">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent animate-pulse">Explore Stocks</h2>
              <TabsList className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-md">
                <TabsTrigger value="trending" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300 hover:bg-white/10">
                  <TrendingUp className="h-4 w-4 mr-2" /> Trending
                </TabsTrigger>
                <TabsTrigger value="gainers" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300 hover:bg-white/10">
                  <Flame className="h-4 w-4 mr-2" /> Top Gainers
                </TabsTrigger>
                <TabsTrigger value="value" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300 hover:bg-white/10">
                  <DollarSign className="h-4 w-4 mr-2" /> Value Picks
                </TabsTrigger>
                <TabsTrigger value="dividend" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300 hover:bg-white/10">
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
      
      <FeatureSection />
      
      <TestimonialSection />
      
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30 animate-float-random"
                style={{
                  width: `${Math.random() * 100 + 30}px`,
                  height: `${Math.random() * 100 + 30}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-pulse">Ready to take your investing to the next level?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90 animate-bounce-slow">
            Join thousands of investors who use StockTile to discover opportunities, analyze market trends, and make smarter investment decisions.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-finance-blue hover:bg-gray-100 hover:scale-110 transition-all duration-300 animate-pulse-rainbow"
            onClick={handleGetStarted}
          >
            Create Free Account
          </Button>
        </div>
      </section>
      
      <Footer />
      
      <StockDetailDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        stock={selectedStock} 
      />

      <AuthDialog 
        isOpen={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        initialMode="register"
      />
      
      <style>
        {`
          @keyframes float-random {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(50px, -30px) rotate(90deg); }
            50% { transform: translate(100px, 40px) rotate(180deg); }
            75% { transform: translate(0px, 100px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-rainbow-trail {
            background: conic-gradient(
              from 0deg at 50% 50%,
              #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9966ff, #ff0000
            );
            filter: blur(15px);
            opacity: 0.7;
            animation: spin 4s linear infinite;
            transform-origin: center;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
