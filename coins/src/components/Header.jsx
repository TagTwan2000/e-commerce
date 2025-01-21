import React, { useEffect, useState } from 'react';
import { PiShoppingCartSimple } from "react-icons/pi";
import sunicon from './../assets/sun.png';
import moonicon from './../assets/moon.png';
import logoicoon from './../assets/b.png';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStateContext } from '../../Context/StateContext'; // Import the context
import { useNavigate } from 'react-router-dom'; 

function Header() {
  const navigate = useNavigate(); 

  const { darkMode, setDarkMode, totalQuantities } = useStateContext(); // Use the context here
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [language, setLanguage] = useState("EN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSBCSectionOpen, setIsSBCSectionOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setIsSBCSectionOpen(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0.83, 1 - window.scrollY / 400);
      setHeaderOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-30"
          onClick={toggleMenu}
        />
      )}
      <header
        className={`flex justify-between items-center shadow-sm p-2 sm:p-4 md:p-6 fixed top-0 left-0 w-full z-40 transition-opacity duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}
        style={{ opacity: headerOpacity }}
      >
        {/* Left Section */}
        <div className="flex items-center ml-2 sm:ml-4 space-x-2 sm:space-x-6">
          <button
            className="flex items-center focus:outline-none text-lg sm:text-2xl hover:scale-110 transition-all cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="mr-2 sm:mr-3">☰</span>
            <span className="text-base sm:text-2xl font-semibold">{isSBCSectionOpen ? 'SBC Section' : 'Menu'}</span>
          </button>
        </div>

        {/* Center Section */}
        <div className="flex items-center justify-center flex-shrink-0 mx-4 sm:mx-8">
        <button
          onClick={() => navigate('/')} // Navigate to home page
          aria-label="Go to Home"
          className="focus:outline-none" // Ensure no outline appears when focused
        >
          <img
            src={logoicoon}
            width={32}
            height={32}
            alt="Logo"
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
        </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-6 mr-2 sm:mr-10 relative">
          {/* Cart Icon with Badge */}
          <button
        className="relative"
        onClick={() => navigate('/cart')} // Navigate to the cart page
        aria-label="Go to cart"
      >
        <PiShoppingCartSimple className="w-5 h-5 sm:w-8 sm:h-8" />
        
        {totalQuantities > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalQuantities}
          </span>
        )}
      </button>
          
          {/* Dark Mode Toggle Button */}
          <button onClick={() => setDarkMode(!darkMode)} className="darkmode-toggle hover:scale-105 transition-all cursor-pointer">
            {darkMode ? (
              <img src={moonicon} alt="Moon" className="w-5 h-5 sm:w-8 sm:h-8" />
            ) : (
              <img src={sunicon} alt="Sun" className="w-5 h-5 sm:w-8 sm:h-8" />
            )}
            <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
        </div>
      </header>

      {/* Sidebar menu */}
      {isMenuOpen && (
        <div
          className={`pl-4 fixed top-0 left-0 w-52 sm:w-64 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'} transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-40 h-screen overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              {isSBCSectionOpen ? (
                <div className="flex items-center">
                  <button className="text-lg sm:text-2xl font-bold text-gray-500 hover:text-gray-700 mr-2 sm:mr-4" onClick={() => setIsSBCSectionOpen(false)}>
                    <ArrowLeft size={16} sm={20} />
                  </button>
                  <span className="text-lg sm:text-2xl font-semibold">SBC Section</span>
                </div>
              ) : (
                <span className="text-lg sm:text-2xl font-semibold">Menu</span>
              )}
              <button className="text-lg sm:text-2xl font-bold text-gray-500 hover:text-gray-700" onClick={toggleMenu}>×</button>
            </div>

            {isSBCSectionOpen ? (
              <ul className="space-y-2 sm:space-y-4 p-4">
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-sm sm:text-lg">Option 1</li>
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-sm sm:text-lg">Option 2</li>
              </ul>
            ) : (
              <ul className="space-y-2 sm:space-y-4 p-4">
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-sm sm:text-lg">Queens (EAFC FIFA 24 - 24)</li>
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-sm sm:text-lg">Mission and XP Section</li>
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-sm sm:text-lg" onClick={() => setIsSBCSectionOpen(true)}>
                  <div className="flex items-center justify-between">
                    <span>SBC Section</span>
                    <span>{isSBCSectionOpen ? <ArrowLeft size={8} /> : <ArrowRight size={8} />}</span>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
