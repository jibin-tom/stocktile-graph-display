
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
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

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const searchInputRef = useRef(null);

  // Filter stocks based on search query
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
    // Navigate to NYSE website with the stock symbol
    window.open(`https://www.nyse.com/quote/${symbol}`, '_blank');
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="font-bold text-2xl text-finance-darkBlue">StockTile</div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center cursor-pointer hover:text-finance-blue">
              Markets <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <div className="flex items-center cursor-pointer hover:text-finance-blue">
              Watchlists <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <div className="flex items-center cursor-pointer hover:text-finance-blue">
              News <ChevronDown className="ml-1 h-4 w-4" />
            </div>
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
                  onClick={() => {
                    if (searchQuery.trim() !== '') {
                      setOpen(true);
                    }
                  }}
                  placeholder="Search for stocks, ETFs, indices" 
                  className="pl-10 h-9 w-full"
                  ref={searchInputRef}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Stocks">
                    {filteredStocks.map((stock) => (
                      <CommandItem
                        key={stock.symbol}
                        onSelect={() => handleSelectStock(stock.symbol)}
                        className="flex items-center"
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
          <Button variant="outline" size="sm">Log In</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
