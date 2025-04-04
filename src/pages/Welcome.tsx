
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Welcome to Stockerr
            </h1>
            
            <div className="relative w-full max-w-lg mb-6">
              <img 
                src="/lovable-uploads/02f77b32-18ab-41ee-99aa-06a25486f0c6.png" 
                alt="Stonks meme with stock market chart" 
                className="w-full h-auto rounded-lg shadow-md mx-auto"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Welcome;
