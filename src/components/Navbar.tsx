
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, DollarSign, BarChart2, TrendingUp, Newspaper, BookOpen, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import mockStocks from '@/data/mockStocks';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AuthDialog from '@/components/auth/AuthDialog';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthProvider';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'login' | 'register'>('login');
  const [colorIndex, setColorIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  const logoColors = [
    'from-blue-600 to-purple-600',
    'from-purple-500 to-pink-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-red-500',
    'from-indigo-500 to-cyan-500'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = mockStocks.filter(
      stock => 
        stock.symbol.toLowerCase().includes(query) || 
        stock.companyName.toLowerCase().includes(query)
    ).slice(0, 6); // Limit to 6 results

    setFilteredStocks(results);
  }, [searchQuery]);

  const handleSelectStock = (symbol) => {
    window.open(`https://www.nyse.com/quote/${symbol}`, '_blank');
    setOpen(false);
    setSearchQuery('');
  };

  const handleOpenLogin = () => {
    setAuthDialogMode('login');
    setAuthDialogOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthDialogMode('register');
    setAuthDialogOpen(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  const openExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div 
            className={`font-bold text-2xl bg-gradient-to-r ${logoColors[colorIndex]} bg-clip-text text-transparent transition-colors duration-1000`}
            style={{
              animation: "pulse 2s infinite"
            }}
          >
            Stockerr
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 font-semibold text-blue-800 hover:text-blue-900 transition-all duration-300">
                    Markets
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="markets-dropdown vibrant-dropdown-content">
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <div className="grid gap-1">
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://www.marketwatch.com/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 vibrant-dropdown-item"
                          >
                            <BarChart2 className="h-4 w-4" />
                            <span>Market Overview</span>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://www.nyse.com/listings/stock" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 vibrant-dropdown-item"
                          >
                            <DollarSign className="h-4 w-4" />
                            <span>Stocks</span>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 vibrant-dropdown-item"
                          >
                            <TrendingUp className="h-4 w-4" />
                            <span>Indices</span>
                          </a>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-1">
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://www.msci.com/our-solutions/indexes/global-equity-indexes" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 vibrant-dropdown-item"
                          >
                            <Globe className="h-4 w-4" />
                            <span>Global Markets</span>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://www.spglobal.com/spdji/en/index-family/select-sectors/sp-sectors/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 vibrant-dropdown-item"
                          >
                            <BarChart2 className="h-4 w-4" />
                            <span>Sectors</span>
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gradient-to-r from-green-100 to-teal-100 hover:from-green-200 hover:to-teal-200 font-semibold text-green-800 hover:text-green-900 transition-all duration-300">
                    Watchlists
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="watchlists-dropdown vibrant-dropdown-content">
                    <div className="grid gap-3 p-4 md:w-[300px]">
                      <NavigationMenuLink asChild>
                        <a 
                          href="/watchlists" 
                          className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-green-100 hover:to-teal-100 vibrant-dropdown-item"
                        >
                          <TrendingUp className="h-4 w-4" />
                          <span>My Watchlists</span>
                        </a>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <a 
                          href="/create-watchlist" 
                          className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-green-100 hover:to-teal-100 vibrant-dropdown-item"
                        >
                          <DollarSign className="h-4 w-4" />
                          <span>Create New Watchlist</span>
                        </a>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 font-semibold text-yellow-800 hover:text-yellow-900 transition-all duration-300">
                    News
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="news-dropdown vibrant-dropdown-content">
                    <div className="grid gap-3 p-4 md:w-[350px]">
                      <NavigationMenuLink asChild>
                        <a 
                          href="https://www.moneycontrol.com/news/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 vibrant-dropdown-item"
                        >
                          <Newspaper className="h-4 w-4" />
                          <span>Latest News</span>
                        </a>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <a 
                          href="https://www.moneycontrol.com/news/business/markets/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 vibrant-dropdown-item"
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>Market Analysis</span>
                        </a>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <a 
                          href="https://www.moneycontrol.com/markets/earnings/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 vibrant-dropdown-item"
                        >
                          <BarChart2 className="h-4 w-4" />
                          <span>Economic Calendar</span>
                        </a>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setOpen(true);
                    }
                  }}
                  onFocus={handleSearchFocus}
                  placeholder="Search for stocks, ETFs, indices" 
                  className="pl-10 h-9 w-full search-bar-blend"
                  ref={searchInputRef}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full vibrant-dropdown-content" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Stocks">
                    {filteredStocks.map((stock) => (
                      <CommandItem
                        key={stock.symbol}
                        onSelect={() => handleSelectStock(stock.symbol)}
                        className="flex items-center vibrant-dropdown-item"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{stock.symbol}</span>
                          <span className="text-xs text-gray-500">{stock.companyName}</span>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                          <span className="font-medium">${stock.price.toFixed(2)}</span>
                          <span className={stock.change >= 0 ? "text-xs text-green-500" : "text-xs text-red-500"}>
                            {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleOpenLogin}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 transition-all duration-300 font-medium shadow-sm hover:shadow bg-gradient-to-r from-blue-50 to-purple-50"
              >
                Log In
              </Button>
              <Button 
                size="sm" 
                onClick={handleOpenSignup}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthDialog 
        isOpen={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        initialMode={authDialogMode} 
      />
      
      <style>
        {`
          @keyframes pulse-subtle {
            0%, 100% {
              box-shadow: 0 0 0 rgba(168, 85, 247, 0.4);
            }
            50% {
              box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
