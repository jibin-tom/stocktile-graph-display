
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-purple-700">
          Stockerr Members
        </h2>
        
        <div className="flex justify-center">
          <div className="max-w-md hover-scale">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-purple-300 animate-scale-in transform hover:shadow-2xl transition-all duration-300">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-30"></div>
                <img 
                  src="/lovable-uploads/86b4b377-c977-435e-afe7-d642426ff16b.png" 
                  alt="Stockerr member testimonial" 
                  className="rounded-lg w-full max-w-xs mx-auto relative z-10"
                />
              </div>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
              
              <p className="italic text-gray-600 text-center bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium">
                "Stockerr has transformed my investment strategy. The insights and analytics are unmatched!"
              </p>
              
              <p className="font-semibold mt-2 text-purple-700">Stockerr Power User</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
