import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo/logo.png';
import { useSearch } from '../context/SearchContext';
import fragranceData from '../data/fragranceData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartItemCount = getCartCount();
  const { isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef(null);
  const { setSearchQuery, setSearchResults, setIsSearching } = useSearch();

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsShopOpen(false);
  };

  // Function to close shop dropdown
  const closeShopDropdown = () => {
    setIsShopOpen(false);
  };

  // Search function
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Search across all fragrance categories
    const allFragrances = [
      ...fragranceData.women,
      ...fragranceData.men,
      ...fragranceData.unisex,
      ...fragranceData.bestSellers,
      ...fragranceData.newArrivals
    ];

    const results = allFragrances.filter(fragrance =>
      fragrance.name.toLowerCase().includes(query.toLowerCase()) ||
      fragrance.brand.toLowerCase().includes(query.toLowerCase()) ||
      fragrance.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setSearchQuery(query);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
     <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo and Navigation Links - Left Side */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-serif font-bold text-purple-700  flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <img src={logo} alt="logo" className="animate-spin-pendulum" />  Ludas
            </Link>

            {/* Main Navigation - Desktop */}
            <div className="hidden md:ml-8 md:flex items-baseline space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>

              {/* Shop Link with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center focus:outline-none"
                >
                  Shop
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isShopOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to="/shop/women" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={closeShopDropdown}>Women's Fragrances</Link>
                    <Link to="/shop/men" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={closeShopDropdown}>Men's Fragrances</Link>
                    <Link to="/shop/unisex" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={closeShopDropdown}>Unisex Fragrances</Link>
                    <Link to="/shop/bestsellers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={closeShopDropdown}>Best Sellers</Link>
                    <Link to="/shop/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" onClick={closeShopDropdown}>New Arrivals</Link>
                  </div>
                )}
              </div>

              <Link to="/collections" className="text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200">Collections</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-colors duration-200">About</Link>
            </div>
          </div>

          {/* Right Side Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar - Desktop */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find your scent..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.target.value);
                    // Optionally redirect to search results page
                    window.location.href = '/search-results';
                  }
                }}
              />
            </div>

            {/* Login Text */}
           {isAuthenticated ? (
            <button
             onClick={logout}
             className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
            >
            Logout
          </button>
           ) : (
          <Link to="/login" className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200">
           Login
          </Link>
          )}

            {/* Shopping Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-purple-700 transition-colors duration-200" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button and icons */}
          <div className="md:hidden flex items-center space-x-4">

            {/* Mobile Search Icon - Toggles the search bar */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Login Text (Mobile) */}
            {isAuthenticated ? (
             <button
             onClick={logout}
              className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
               >
              Logout
              </button>
              ) : (
               <Link to="/login" className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200">
               Login
            </Link>
               )}

            {/* Shopping Cart (Mobile) */}
            <Link to="/cart" className="relative p-2 text-gray-600" onClick={closeMobileMenu}>
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Appears below the main nav */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.target.value);
                    setIsSearchOpen(false);
                    closeMobileMenu();
                    // Optionally redirect to search results page
                    window.location.href = '/search-results';
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {/* Mobile Shop Expandable Menu */}
             <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="text-gray-600 hover:text-purple-700 px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center focus:outline-none"
                >
                  Shop
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isShopOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/shop/women"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => {
                        closeMobileMenu();
                        closeShopDropdown();
                      }}
                    >
                      Women's Fragrances
                    </Link>
                    <Link
                      to="/shop/men"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => {
                        closeMobileMenu();
                        closeShopDropdown();
                      }}
                    >
                      Men's Fragrances
                    </Link>
                    <Link
                      to="/shop/unisex"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => {
                        closeMobileMenu();
                        closeShopDropdown();
                      }}
                    >
                      Unisex Fragrances
                    </Link>
                    <Link
                      to="/shop/bestsellers"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => {
                        closeMobileMenu();
                        closeShopDropdown();
                      }}
                    >
                      Best Sellers
                    </Link>
                    <Link
                      to="/shop/new"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => {
                        closeMobileMenu();
                        closeShopDropdown();
                      }}
                    >
                      New Arrivals
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/collections"
                className="block px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <div className="border-t border-gray-200 pt-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;