import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './product/CartIcon';

const Navbar = () => {
  return ( 
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">ZPrincessSaffron</div>
        <div className="space-x-4">
          <Link 
            className="text-gray-300 hover:text-white transition-colors duration-200" 
            to={'/'}
          >
            Product
          </Link>
          <Link 
            className="text-gray-300 hover:text-white transition-colors duration-200" 
            to={'/register'}
          >
            Register
          </Link>
          <Link 
            className="text-gray-300 hover:text-white transition-colors duration-200" 
            to={'/login'}
          >
            Login
          </Link>
        </div>
      </div> 
    </nav>
  );
}

export default Navbar;
