
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Search, Bell, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Real-time Market Data',
    description: 'Get up-to-the-minute price quotes, charts, and market news',
    icon: <TrendingUp className="h-10 w-10" />,
    gradient: 'from-blue-400/50 via-purple-400/40 to-pink-400/50',
  },
  {
    title: 'Advanced Stock Screening',
    description: 'Filter stocks by performance, fundamentals, and technical indicators',
    icon: <Search className="h-10 w-10" />,
    gradient: 'from-green-400/50 via-teal-400/40 to-blue-400/50',
  },
  {
    title: 'Custom Alerts',
    description: 'Set price targets and get notified when stocks hit your thresholds',
    icon: <Bell className="h-10 w-10" />,
    gradient: 'from-yellow-400/50 via-orange-400/40 to-red-400/50',
  },
  {
    title: 'In-depth Analytics',
    description: 'Visualize performance metrics and track your investment growth',
    icon: <BarChart3 className="h-10 w-10" />,
    gradient: 'from-pink-400/50 via-purple-400/40 to-indigo-400/50',
  },
];

const FeatureSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
          Powerful Tools for Smarter Investing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`transition-all duration-500 transform hover:scale-105 hover:shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-sm
                        ${hoveredIndex === index ? 'translate-y-[-8px]' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-${hoveredIndex === index ? '10' : '5'}`} />
              <div className={`absolute inset-[-2px] bg-gradient-to-r ${feature.gradient} opacity-${hoveredIndex === index ? '40' : '20'} blur-[3px] -z-10`}></div>
              
              <CardContent className="pt-6 text-center relative z-10">
                <div className={`flex justify-center mb-4 transition-all duration-300
                                ${hoveredIndex === index ? 'scale-110 translate-y-[-5px]' : ''}`}>
                  <div className={`text-white bg-gradient-to-r ${feature.gradient.replace(/\/\d+/g, '')} p-3 rounded-full`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-medium mb-2 transition-all duration-300 text-gray-900`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
