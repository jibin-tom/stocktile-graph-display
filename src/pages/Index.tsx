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
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-300/50" 
                onClick={handleGetStarted}
              >
                Get Started — It's Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-indigo-200/50"
                onClick={handleHowItWorks}
              >
                See How It Works
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-center relative">
            <div className="relative w-full max-w-md h-96">
              <img 
                src="/lovable-uploads/d5af928d-133e-4280-8b4f-0390db8a01d0.png" 
                alt="Stock trader with sunglasses" 
                className="rounded-lg max-w-full h-auto shadow-lg relative z-10 mx-auto"
                style={{ maxHeight: "350px" }}
              />
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="animate-border-flow"></div>
              </div>
              <p className={`text-lg mt-4 font-bold text-center px-4 transition-all duration-700 delay-700 ${titleAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                സ്റ്റോക്കിങ്ങ് എന്താണെന്ന് അറിയോo ചെയ്യാം, അതിൽ പൈസ ഇട്ടിട്ടുമുണ്ട് പൈസ പോയിട്ടുമുണ്ട്....
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-left px-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse inline-block">Market Overview</h2>
          <MarketOverview />
        </div>
      </section>
      
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent animate-pulse">Explore Stocks</h2>
            <Tabs defaultValue="trending">
              <TabsList className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-lg shadow-lg">
                <TabsTrigger value="trending" className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 transition-all duration-300 hover:bg-white/10">
                  <TrendingUp className="h-4 w-4 mr-2" /> Trending
                </TabsTrigger>
                <TabsTrigger value="gainers" className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 transition-all duration-300 hover:bg-white/10">
                  <Flame className="h-4 w-4 mr-2" /> Top Gainers
                </TabsTrigger>
                <TabsTrigger value="value" className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 transition-all duration-300 hover:bg-white/10">
                  <DollarSign className="h-4 w-4 mr-2" /> Value Picks
                </TabsTrigger>
                <TabsTrigger value="dividend" className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 transition-all duration-300 hover:bg-white/10">
                  <Percent className="h-4 w-4 mr-2" /> Dividend
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">View All Stocks</Button>
          </div>
        </div>
      </section>
      
      <FeatureSection />
      
      <TestimonialSection />
      
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30 animate-float-random"
                style={{
                  width: `${Math.random() * 120 + 40}px`,
                  height: `${Math.random() * 120 + 40}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  filter: 'blur(2px)',
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-pulse-rainbow">Ready to take your investing to the next level?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-white/90 animate-bounce-slow">
            Join thousands of investors who use StockTile to discover opportunities, analyze market trends, and make smarter investment decisions.
          </p>
          <Button 
            size="lg" 
            className="bg-white bg-opacity-20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-indigo-700 hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-white/30"
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
          @keyframes border-flow {
            0%, 100% { 
              background-position: 0% 50%; 
              transform: rotate(0deg);
            }
            25% { 
              background-position: 100% 50%; 
              transform: rotate(90deg);
            }
            50% { 
              background-position: 100% 0%; 
              transform: rotate(180deg);
            }
            75% { 
              background-position: 0% 100%; 
              transform: rotate(270deg);
            }
          }
          
          .animate-border-flow {
            position: absolute;
            width: calc(100% + 20px);
            height: calc(100% + 20px);
            top: -10px;
            left: -10px;
            border-radius: inherit;
            background: linear-gradient(45deg, #ff0080, #ff8c00, #ffff00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8);
            background-size: 400% 400%;
            filter: blur(8px);
            z-index: 0;
            animation: border-flow 15s linear infinite;
          }
          
          @keyframes float-random {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(5deg); }
            50% { transform: translateY(-35px) rotate(-5deg); }
            75% { transform: translateY(-15px) rotate(10deg); }
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes pulse-rainbow {
            0%, 100% { 
              opacity: 1;
              text-shadow: 0 0 10px rgba(255,255,255,0.5);
            }
            50% { 
              opacity: 0.9; 
              text-shadow: 0 0 20px rgba(255,255,255,0.8);
            }
          }
          
          .animate-pulse-rainbow {
            animation: pulse-rainbow 3s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
