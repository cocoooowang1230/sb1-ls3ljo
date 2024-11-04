import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Coins } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 animate-slide-up">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-around">
          <li>
            <Link
              to="/"
              className={`flex flex-col items-center transition-all duration-300 hover:scale-110 ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Home size={24} className={location.pathname === '/' ? 'animate-float' : ''} />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/my-tokens"
              className={`flex flex-col items-center transition-all duration-300 hover:scale-110 ${
                location.pathname === '/my-tokens' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Coins size={24} className={location.pathname === '/my-tokens' ? 'animate-float' : ''} />
              <span className="text-xs mt-1">My Tokens</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavigation;