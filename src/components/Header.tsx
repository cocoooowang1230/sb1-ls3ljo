import React from 'react';
import { Link } from 'react-router-dom';
import { Coins } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white animate-slide-up">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center hover:scale-105 transition-transform duration-300">
          <Coins className="mr-2 animate-float" /> Bitdog
        </Link>
        <Link 
          to="/profile" 
          className="w-8 h-8 rounded-full overflow-hidden transform hover:scale-110 transition-transform duration-300 hover:ring-2 hover:ring-white hover:ring-opacity-50"
        >
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;