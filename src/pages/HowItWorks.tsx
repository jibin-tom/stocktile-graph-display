
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div className="flex flex-col items-center justify-center">
            <img 
              src="/lovable-uploads/73b6bcfd-8e55-4058-b586-b753e61580c1.png" 
              alt="How Stockerr Works" 
              className="w-auto max-h-[70vh] h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
