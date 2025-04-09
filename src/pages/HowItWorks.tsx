
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GifImage from '@/components/GifImage';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 pt-24">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse opacity-60"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 15s ease infinite',
            }}
          ></div>
          <div className="flex flex-col items-center justify-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              How Stockerr Works
            </h2>
            <div className="relative rounded-lg overflow-hidden max-w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow rounded-lg blur-md"></div>
              <GifImage 
                src="https://media1.tenor.com/m/_5CeDMCoGJEAAAAd/salim-kumar.gif" 
                alt="How Stockerr Works" 
                className="w-auto max-h-[60vh] object-contain rounded-lg mx-auto relative"
                width="100%"
                height="auto"
                loadingComponent={
                  <div className="animate-pulse bg-gray-200 rounded-md h-[40vh] w-full flex items-center justify-center">
                    <p className="text-gray-500">Loading GIF...</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default HowItWorks;
