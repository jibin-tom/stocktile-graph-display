
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import mockStocks from '@/data/mockStocks';
import { Check, Plus, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

const CreateWatchlist = () => {
  const [watchlistName, setWatchlistName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const filteredStocks = mockStocks
    .filter(stock => 
      stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);

  const handleAddStock = (stock) => {
    if (!selectedStocks.some(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const handleRemoveStock = (symbol) => {
    setSelectedStocks(selectedStocks.filter(stock => stock.symbol !== symbol));
  };

  const handleCreateWatchlist = async () => {
    if (!watchlistName) {
      toast({
        title: "Error",
        description: "Please enter a watchlist name",
        variant: "destructive",
      });
      return;
    }

    if (selectedStocks.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one stock to your watchlist",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a watchlist",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store watchlist in localStorage for now
      // In a real application, this would be stored in a database
      const watchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
      
      const newWatchlist = {
        id: Date.now(),
        name: watchlistName,
        userId: user?.id,
        stocks: selectedStocks.map(stock => ({
          symbol: stock.symbol,
          companyName: stock.companyName
        })),
        createdAt: new Date().toISOString()
      };
      
      watchlists.push(newWatchlist);
      localStorage.setItem('watchlists', JSON.stringify(watchlists));
      
      toast({
        title: "Success",
        description: `Watchlist "${watchlistName}" created successfully!`,
      });
      
      // Reset form
      setWatchlistName('');
      setSelectedStocks([]);
      
    } catch (error) {
      console.error("Error creating watchlist:", error);
      toast({
        title: "Error",
        description: "Failed to create watchlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Watchlist</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>Watchlist Details</CardTitle>
                  <CardDescription>Name your watchlist and add stocks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="watchlist-name" className="block text-sm font-medium mb-1">
                      Watchlist Name
                    </label>
                    <Input
                      id="watchlist-name"
                      placeholder="My Growth Stocks"
                      value={watchlistName}
                      onChange={(e) => setWatchlistName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stock-search" className="block text-sm font-medium mb-1">
                      Search Stocks
                    </label>
                    <Input
                      id="stock-search"
                      placeholder="Search by name or symbol"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {searchTerm && (
                    <div className="mt-2 border rounded-md max-h-60 overflow-y-auto">
                      {filteredStocks.length > 0 ? (
                        filteredStocks.map((stock) => (
                          <div 
                            key={stock.symbol}
                            className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                            onClick={() => handleAddStock(stock)}
                          >
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-gray-500">{stock.companyName}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddStock(stock);
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No stocks found
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleCreateWatchlist} 
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Creating...' : 'Create Watchlist'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Stocks</CardTitle>
                  <CardDescription>
                    {selectedStocks.length} {selectedStocks.length === 1 ? 'stock' : 'stocks'} selected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStocks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedStocks.map((stock) => (
                        <div 
                          key={stock.symbol}
                          className="p-3 border rounded-md flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.companyName}</div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveStock(stock.symbol)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No stocks selected yet. Search and add stocks from the left panel.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateWatchlist;
