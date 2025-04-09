
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  
  const gradients = [
    'from-purple-500 via-pink-400 to-blue-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-green-400 via-teal-500 to-cyan-500',
    'from-indigo-500 via-purple-500 to-pink-500',
  ];

  const testimonials = [
    {
      image: '/lovable-uploads/86b4b377-c977-435e-afe7-d642426ff16b.png',
      text: "Stockerr has transformed my investment strategy. The insights and analytics are unmatched!",
      name: "Rangannan",
      role: "Stockerr Power User"
    },
    {
      image: '/lovable-uploads/91399f81-e42b-4ccb-84b6-2996983bd8c5.png',
      text: "The absolute best platform I've ever used. It's like having a crystal ball for the stock market!",
      name: "Jordan Belfort",
      role: "Investment Professional"
    }
  ];
  
  useEffect(() => {
    // Initial animation
    setAnimate(true);
    
    // Create periodic animations and testimonial rotation
    const animInterval = setInterval(() => {
      // First, trigger exit animation
      setAnimate(false);
      
      // After exit animation completes, change testimonial and trigger entrance animation
      setTimeout(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        setAnimate(true);
      }, 500); // Half a second for exit animation
      
    }, 5000); // Change testimonial every 5 seconds
    
    // Rotate through gradients
    const colorInterval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % gradients.length);
    }, 3000);
    
    return () => {
      clearInterval(animInterval);
      clearInterval(colorInterval);
    };
  }, []);

  const currentItem = testimonials[currentTestimonial];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-bg 15s ease infinite',
        }}
      />
      
      {/* Floating animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          className={`text-3xl font-bold text-center mb-12 ${
            animate ? 'scale-105 opacity-100' : 'scale-100 opacity-90'
          } transition-all duration-1000 bg-gradient-to-r ${gradients[colorIndex]} bg-clip-text text-transparent`}
        >
          Stockerr Members
        </h2>
        
        <div className="flex justify-center">
          <div className={`max-w-md transform transition-all duration-700 ${
            animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 flex flex-col items-center relative ${
              animate ? 'translate-y-0' : 'translate-y-2'
            } transition-all duration-700 hover:shadow-2xl`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl blur opacity-50 animate-pulse"></div>
              
              <div className="relative mb-4 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur-md animate-pulse"></div>
                <img 
                  src={currentItem.image}
                  alt={`${currentItem.name} testimonial`}
                  className={`rounded-lg w-full max-w-xs mx-auto relative z-10 ${
                    animate ? 'rotate-0' : 'rotate-1'
                  } transition-all duration-1000`}
                />
              </div>
              
              <div className="flex items-center mb-2 z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-yellow-400 text-yellow-400`}
                    style={{ 
                      animation: `star-pulse 1.5s infinite ${i * 300}ms`,
                      transform: animate ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                ))}
              </div>
              
              <p className={`italic text-center bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent font-medium text-lg z-10 ${
                animate ? 'opacity-100' : 'opacity-80'
              } transition-all duration-700`}>
                "{currentItem.text}"
              </p>
              
              <p className={`font-semibold mt-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent z-10 ${
                animate ? 'translate-x-0' : 'translate-x-1'
              } transition-all duration-500`}>
                {currentItem.name}
              </p>
              
              <p className={`text-sm mt-1 text-gray-600 z-10 ${
                animate ? 'opacity-100' : 'opacity-0'
              } transition-all duration-700`}>
                {currentItem.role}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes gradient-bg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes star-pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.4); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -50px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default TestimonialSection;
