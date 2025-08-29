// Shop.jsx
import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { useParams } from 'react-router-dom';
import fragranceData from '../data/fragranceData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const { category } = useParams();
  const [fragrances, setFragrances] = useState([]);
  const [filteredFragrances, setFilteredFragrances] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [category]);

  //Cart
  const handleAddToCart = (fragrance) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(fragrance);
  };

  // Search functionality
  const { searchQuery } = useSearch();

  // Load fragrances based on category
  useEffect(() => {
    let categoryFragrances = [];

    switch (category) {
      case "women":
        categoryFragrances = fragranceData.women;
        break;
      case "men":
        categoryFragrances = fragranceData.men;
        break;
      case "unisex":
        categoryFragrances = fragranceData.unisex;
        break;
      case "bestsellers":
        categoryFragrances = fragranceData.bestSellers;
        break;
      case "new":
        categoryFragrances = fragranceData.newArrivals;
        break;
      default:
        // If no specific category, show all fragrances
        categoryFragrances = [
          ...fragranceData.women,
          ...fragranceData.men,
          ...fragranceData.unisex,
          ...fragranceData.bestSellers,
          ...fragranceData.newArrivals,
        ];
    }

    setFragrances(categoryFragrances);

    // Set max price for range slider
    const maxPrice = Math.max(
      ...categoryFragrances.map((item) => item.price),
      0
    );
    setPriceRange([0, maxPrice]);
  }, [category]); // This effect runs when the category changes

  // Update the useEffect for filtering
  useEffect(() => {
    // Filter by price range and search query
    let filtered = fragrances;

    if (searchQuery) {
      filtered = filtered.filter(
        (fragrance) =>
          fragrance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fragrance.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fragrance.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (fragrance) =>
        fragrance.price >= priceRange[0] && fragrance.price <= priceRange[1]
    );

    // Sort filtered results
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "brand") {
        return a.brand.localeCompare(b.brand);
      }
      return 0;
    });

    setFilteredFragrances(sorted);
  }, [fragrances, sortBy, priceRange, searchQuery]);

  // Helper function to get category title
  const getCategoryTitle = () => {
    switch (category) {
      case "women":
        return "Women's Fragrances";
      case "men":
        return "Men's Fragrances";
      case "unisex":
        return "Unisex Fragrances";
      case "bestsellers":
        return "Best Sellers";
      case "new":
        return "New Arrivals";
      default:
        return "All Fragrances";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600 mt-2">
            Discover our exquisite collection of{" "}
            {getCategoryTitle().toLowerCase()}
          </p>
          {searchQuery && (
            <p className="text-purple-600 mt-2">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="price-range"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              id="price-range"
              min="0"
              max={Math.max(...fragrances.map((item) => item.price), 500)}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="w-full md:w-1/3">
            <label
              htmlFor="sort-by"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

        {/* Products Grid */}
        {filteredFragrances.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "No fragrances found matching your search."
                : "No fragrances available in this category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFragrances.map((fragrance) => (
              <div
                key={fragrance.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-68 w-full overflow-hidden">
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full p-2 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {fragrance.name}
                  </h3>
                  <p className="text-sm text-gray-600">{fragrance.brand}</p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {fragrance.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-purple-700 font-bold">
                      ${fragrance.price}
                    </p>
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

export default Shop;