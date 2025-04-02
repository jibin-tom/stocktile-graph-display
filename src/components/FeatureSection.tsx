
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Search, Bell, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Real-time Market Data',
    description: 'Get up-to-the-minute price quotes, charts, and market news',
    icon: <TrendingUp className="h-10 w-10 text-finance-blue" />,
  },
  {
    title: 'Advanced Stock Screening',
    description: 'Filter stocks by performance, fundamentals, and technical indicators',
    icon: <Search className="h-10 w-10 text-finance-blue" />,
  },
  {
    title: 'Custom Alerts',
    description: 'Set price targets and get notified when stocks hit your thresholds',
    icon: <Bell className="h-10 w-10 text-finance-blue" />,
  },
  {
    title: 'In-depth Analytics',
    description: 'Visualize performance metrics and track your investment growth',
    icon: <BarChart3 className="h-10 w-10 text-finance-blue" />,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Tools for Smarter Investing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-t-4 border-t-finance-blue">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
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
