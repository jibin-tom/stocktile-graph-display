
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileDetection: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Vibrant, colorful, blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 opacity-80">
        <div className="absolute inset-0 backdrop-blur-md">
          {/* Animated gradient orbs in background */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 animate-float-random"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/30 shadow-xl">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/a252d9ba-3dd2-40ae-bf94-c41e6f63af8e.png" 
              alt="Desktop Only" 
              className="w-32 h-32 mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-white text-center">
              Desktop View Only
            </h2>
            <p className="text-white/90 text-center mb-4">
              We're sorry, but Stockerr is currently available only in desktop mode.
            </p>
            <div className="w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 rounded-full my-4"></div>
            <p className="text-white/80 text-center text-sm">
              For the best experience, please use a desktop or laptop computer with a screen width of at least 1024px.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetection;
