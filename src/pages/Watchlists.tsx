
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import mockStocks from '@/data/mockStocks';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Link } from 'react-router-dom';

const Watchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load watchlists from localStorage
    const storedWatchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
    
    // Filter watchlists for the current user
    const userWatchlists = user 
      ? storedWatchlists.filter(watchlist => watchlist.userId === user.id)
      : [];
    
    setWatchlists(userWatchlists);
  }, [user]);

  const handleDeleteWatchlist = (id) => {
    try {
      const storedWatchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
      const updatedWatchlists = storedWatchlists.filter(watchlist => watchlist.id !== id);
      localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
      
      // Update state
      setWatchlists(prevWatchlists => prevWatchlists.filter(watchlist => watchlist.id !== id));
      
      toast({
        title: "Success",
        description: "Watchlist deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting watchlist:", error);
      toast({
        title: "Error",
        description: "Failed to delete watchlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to get the latest price and change for a stock
  const getStockDetails = (symbol) => {
    const stock = mockStocks.find(s => s.symbol === symbol);
    return stock ? {
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent
    } : {
      price: 0,
      change: 0,
      changePercent: 0
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Watchlists</h1>
            <Link to="/create-watchlist">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Watchlist
              </Button>
            </Link>
          </div>
          
          {!user ? (
            <Card className="mb-6">
              <CardContent className="py-8 text-center">
                <p className="text-lg mb-4">Please log in to view your watchlists</p>
                <Button>Log In</Button>
              </CardContent>
            </Card>
          ) : watchlists.length === 0 ? (
            <Card className="mb-6">
              <CardContent className="py-8 text-center">
                <p className="text-lg mb-4">You don't have any watchlists yet</p>
                <Link to="/create-watchlist">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Watchlist
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {watchlists.map((watchlist) => (
                <Card key={watchlist.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{watchlist.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteWatchlist(watchlist.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <CardDescription>
                      Created on {new Date(watchlist.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {watchlist.stocks.length > 0 ? (
                      <div className="space-y-2">
                        {watchlist.stocks.map((stock) => {
                          const stockDetails = getStockDetails(stock.symbol);
                          return (
                            <div 
                              key={stock.symbol}
                              className="p-3 border rounded-md flex justify-between items-center"
                            >
                              <div>
                                <div className="font-medium">{stock.symbol}</div>
                                <div className="text-sm text-gray-500">{stock.companyName}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${stockDetails.price.toFixed(2)}</div>
                                <div className={stockDetails.change >= 0 ? "text-xs text-green-500" : "text-xs text-red-500"}>
                                  {stockDetails.change >= 0 ? "+" : ""}{stockDetails.change.toFixed(2)} ({stockDetails.changePercent.toFixed(2)}%)
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-gray-500">
                        No stocks in this watchlist
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Watchlists;
