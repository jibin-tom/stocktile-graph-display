
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GifImage from '@/components/GifImage';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div className="flex flex-col items-center justify-center">
            <GifImage 
              src="https://media1.tenor.com/m/_5CeDMCoGJEAAAAd/salim-kumar.gif" 
              alt="How Stockerr Works" 
              className="w-auto max-h-[70vh] object-contain rounded-lg"
              width="100%"
              height="auto"
              loadingComponent={
                <div className="animate-pulse bg-gray-200 rounded-md h-[50vh] w-full flex items-center justify-center">
                  <p className="text-gray-500">Loading GIF...</p>
                </div>
              }
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
