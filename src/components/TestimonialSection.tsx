
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Initial animation
    setAnimate(true);
    
    // Create periodic animations
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 200);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200">
      <div className="max-w-7xl mx-auto">
        <h2 
          className={`text-3xl font-bold text-center mb-12 ${
            animate ? 'scale-105 opacity-100' : 'scale-100 opacity-90'
          } transition-all duration-1000 bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent`}
        >
          Stockerr Members
        </h2>
        
        <div className="flex justify-center">
          <div className="max-w-md transform hover:scale-105 transition-all duration-300">
            <div className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-purple-300 ${
              animate ? 'translate-y-0' : 'translate-y-2'
            } transition-all duration-700 hover:shadow-2xl`}>
              <div className="relative mb-4">
                <img 
                  src="/lovable-uploads/86b4b377-c977-435e-afe7-d642426ff16b.png" 
                  alt="Stockerr member testimonial" 
                  className={`rounded-lg w-full max-w-xs mx-auto relative z-10 ${
                    animate ? 'rotate-0' : 'rotate-1'
                  } transition-all duration-1000`}
                />
              </div>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-yellow-400 text-yellow-400`}
                    style={{ 
                      animation: `pulse 1.5s infinite ${i * 300}ms`,
                      transform: animate ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                ))}
              </div>
              
              <p className={`italic text-center bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent font-medium text-lg ${
                animate ? 'opacity-100' : 'opacity-80'
              } transition-all duration-700`}>
                "Stockerr has transformed my investment strategy. The insights and analytics are unmatched!"
              </p>
              
              <p className={`font-semibold mt-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent ${
                animate ? 'translate-x-0' : 'translate-x-1'
              } transition-all duration-500`}>
                Stockerr Power User
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
