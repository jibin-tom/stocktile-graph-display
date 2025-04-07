import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl text-finance-darkBlue mb-4">Stockerr</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop platform for stock market insights and analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-finance-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-finance-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-finance-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Stock Screener</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Market Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Portfolio Tracker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Watchlists</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Learning Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Market News</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Investment Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-finance-blue">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2023 Stockerr. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-finance-blue text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-finance-blue text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-finance-blue text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
