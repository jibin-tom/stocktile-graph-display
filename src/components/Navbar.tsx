
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search for stocks, ETFs, indices" 
            className="pl-10 h-9 w-full"
          />
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
