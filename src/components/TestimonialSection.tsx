
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Stockerr Members</h2>
        
        <div className="flex justify-center">
          <div className="max-w-md">
            <div className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src="/lovable-uploads/86b4b377-c977-435e-afe7-d642426ff16b.png" 
                  alt="Stockerr member testimonial" 
                  className="rounded-lg w-full max-w-xs mx-auto"
                />
              </div>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="italic text-gray-600 text-center">
                "Stockerr has transformed my investment strategy. The insights and analytics are unmatched!"
              </p>
              
              <p className="font-semibold mt-2">Stockerr Power User</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
