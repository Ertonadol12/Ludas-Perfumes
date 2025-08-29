// Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import fragranceData from '../data/fragranceData';
import '../index.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [randomFragrances, setRandomFragrances] = useState([]);
  const [mixedFragrances, setMixedFragrances] = useState([]);
  const [filteredMixedFragrances, setFilteredMixedFragrances] = useState([]);
  const scrollRefs = useRef([]);
  const autoScrollInterval = useRef(null);
  const [duplicatedFragrances, setDuplicatedFragrances] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('name');
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

  // Function to get random fragrances from each category
  const getRandomFragrances = () => {
    const categories = ['women', 'men', 'unisex', 'bestSellers', 'newArrivals'];
    const randomFrags = categories.map(category => {
      const categoryFrags = fragranceData[category];
      const randomIndex = Math.floor(Math.random() * categoryFrags.length);
      return categoryFrags[randomIndex];
    });
    setRandomFragrances(randomFrags);

    // Duplicate the fragrances for seamless looping
    setDuplicatedFragrances([...randomFrags, ...randomFrags]);
  };

  // Mix all fragrances from all categories
  useEffect(() => {
    getRandomFragrances(); // Get initial random fragrances

    // Combine all fragrances from all categories
    const allFragrances = [
      ...fragranceData.women,
      ...fragranceData.men,
      ...fragranceData.unisex,
      ...fragranceData.bestSellers,
      ...fragranceData.newArrivals
    ];

    // Shuffle the array to mix all fragrances
    const shuffledFragrances = [...allFragrances].sort(() => Math.random() - 0.5);
    setMixedFragrances(shuffledFragrances);
    setFilteredMixedFragrances(shuffledFragrances);

    // Set max price for range slider
    const maxPrice = Math.max(...allFragrances.map(item => item.price), 0);
    setPriceRange([0, maxPrice]);

    // Clean up interval on unmount
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  // Filter and sort mixed fragrances when criteria change
  useEffect(() => {
    // Filter by price range
    const filtered = mixedFragrances.filter(fragrance =>
      fragrance.price >= priceRange[0] && fragrance.price <= priceRange[1]
    );

    // Sort filtered results
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'brand') {
        return a.brand.localeCompare(b.brand);
      }
      return 0;
    });

    setFilteredMixedFragrances(sorted);
  }, [mixedFragrances, sortBy, priceRange]);

  // Update duplicated fragrances when randomFragrances changes
  useEffect(() => {
    if (randomFragrances.length > 0) {
      setDuplicatedFragrances([...randomFragrances, ...randomFragrances]);
    }
  }, [randomFragrances]);

  // Start auto-scrolling when component mounts
  useEffect(() => {
    if (duplicatedFragrances.length > 0) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [duplicatedFragrances]);

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    // Reset scroll position to beginning
    if (scrollRefs.current[4]) {
      scrollRefs.current[4].scrollLeft = 0;
    }

    autoScrollInterval.current = setInterval(() => {
      if (scrollRefs.current[4]) {
        const container = scrollRefs.current[4];
        const scrollWidth = container.scrollWidth / 2; // Since we duplicated the items

        // Scroll slowly
        container.scrollBy({
          left: 1,
          behavior: 'auto'
        });

        // Reset to beginning when reaching the midpoint (end of original items)
        if (container.scrollLeft >= scrollWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'auto'
          });
        }
      }
    }, 30); // Adjust speed by changing the interval time
  };

  const handleWheel = (e, ref) => {
    if (ref && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      ref.scrollLeft += e.deltaX + e.deltaY;
    }
  };

  // Function to scroll left/right
  const scroll = (ref, direction) => {
    if (ref) {
      const scrollAmount = 300;
      ref.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Row titles array
  const rowTitles = [
    "Timeless Classics & Iconic Scents",
    "Modern Masterpieces & Trendsetters",
    "Bold & Unexpected Fragrance Experiences",
    "Luxury Niche & Artisanal Creations"
  ];




  //Search Functionality
  const { searchQuery, setSearchQuery, searchResults, setSearchResults, isSearching, setIsSearching } = useSearch();

  // Add this useEffect to handle search filtering
  useEffect(() => {
    if (searchQuery) {
      const filtered = mixedFragrances.filter(fragrance =>
        (fragrance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fragrance.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fragrance.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        fragrance.price >= priceRange[0] && fragrance.price <= priceRange[1]
      );

      // Sort filtered results
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'price-low') {
          return a.price - b.price;
        } else if (sortBy === 'price-high') {
          return b.price - a.price;
        } else if (sortBy === 'brand') {
          return a.brand.localeCompare(b.brand);
        }
        return 0;
      });

      setFilteredMixedFragrances(sorted);
    } else {
      // Original filtering logic when no search query
      const filtered = mixedFragrances.filter(fragrance =>
        fragrance.price >= priceRange[0] && fragrance.price <= priceRange[1]
      );

      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'price-low') {
          return a.price - b.price;
        } else if (sortBy === 'price-high') {
          return b.price - a.price;
        } else if (sortBy === 'brand') {
          return a.brand.localeCompare(b.brand);
        }
        return 0;
      });

      setFilteredMixedFragrances(sorted);
    }
  }, [mixedFragrances, sortBy, priceRange, searchQuery]); // Add searchQuery to dependencies


  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Filters and Sorting */}
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              id="price-range"
              min="0"
              max={Math.max(...mixedFragrances.map(item => item.price), 500)}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="brand">Brand (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Mixed Fragrances Section */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-500 pb-3">
          Our Complete Collection
        </h2>

        {filteredMixedFragrances.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No fragrances found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {rowTitles.map((title, rowIndex) => (
              <div key={rowIndex} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-start mb-4">
                  <h3 className="text-lg font-semibold text-black">
                    {title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMixedFragrances
                    .slice(rowIndex * 4, (rowIndex + 1) * 4)
                    .map(fragrance => (
                      <div key={fragrance.id} className="animate-fadeIn">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                          <div className="relative h-68 aspect-square overflow-hidden">
                            <img
                              src={fragrance.image}
                              alt={fragrance.name}
                              className="w-full h-full p-3 object-cover rounded-md hover-single-bounce"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-medium text-black truncate text-sm">{fragrance.name}</h3>
                            <p className="text-xs text-gray-600 truncate">{fragrance.brand}</p>
                            <p className="text-xs text-gray-700 mt-2 line-clamp-2 flex-grow">{fragrance.description}</p>
                            <div className="flex justify-between items-center mt-auto pt-2">
                              <p className="text-purple-700 font-bold text-sm">${fragrance.price}</p>
                              <button
                               onClick={() => handleAddToCart(fragrance)}
                               className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                                >
                                Add to Cart
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Random Picks Section with Infinite Auto-scroll */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black border-b border-gray-200 pb-3">
              Today's Random Picks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {randomFragrances.map((fragrance, index) => (
              <div key={index} className="animate-fadeIn">
                <div className="text-center p-4 bg-gray-100 rounded-lg flex flex-col h-full">
                  <div className="relative w-40 h-40 mx-auto mb-3">
                    <div
                      className="w-full h-full rounded-full overflow-hidden border-4 border-none animate-rotate"
                      style={{
                        animationDuration: '25s',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite'
                      }}
                    >
                      <img
                        src={fragrance?.image}
                        alt={fragrance?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-black text-sm mt-3">{fragrance?.name}</h3>
                    <p className="text-xs text-gray-600">{fragrance?.brand}</p>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <p className="text-purple-700 font-bold text-sm">${fragrance?.price}</p>
                      <button
                      onClick={() => handleAddToCart(fragrance)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                       >
                       Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={getRandomFragrances}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh Picks
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar, animations, and rotation */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate {
          animation-name: rotate;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;