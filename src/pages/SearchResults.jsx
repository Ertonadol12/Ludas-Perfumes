// SearchResults.jsx
import React, { useEffect } from "react";
import { useSearch } from '../context/SearchContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const { searchQuery, searchResults, isSearching } = useSearch();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Cart
  const handleAddToCart = (fragrance) => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }
  addToCart(fragrance);
};



  if (isSearching) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 pt-20 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results {searchQuery && `for "${searchQuery}"`}
        </h1>
        <p className="text-gray-600 mb-8">
          {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
        </p>

        {searchResults.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No fragrances found matching your search.</p>
            <Link
              to="/"
              className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse All Fragrances
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(fragrance => (
              <div key={fragrance.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-68 w-full overflow-hidden">
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{fragrance.name}</h3>
                  <p className="text-sm text-gray-600">{fragrance.brand}</p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{fragrance.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-purple-700 font-bold">${fragrance.price}</p>
                    <button
                    onClick={() => handleAddToCart(fragrance)}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                     >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;