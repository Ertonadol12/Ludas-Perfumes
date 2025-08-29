import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import fragranceData from '../data/fragranceData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const { searchQuery } = useSearch();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  //Cart
  const handleAddToCart = (fragrance) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(fragrance);
  };

  // Get all fragrances from all categories
  const allFragrances = [
    ...fragranceData.women,
    ...fragranceData.men,
    ...fragranceData.unisex
  ];

  // Get unique brands from all fragrances
  const allBrands = [...new Set(allFragrances.map(f => f.brand))].sort();

  // Get featured collections (grouped by brand)
  const featuredCollections = allBrands.map(brand => {
    const brandFragrances = allFragrances.filter(f => f.brand === brand);

    return {
      brand,
      image: brandFragrances[0]?.image,
      count: brandFragrances.length
    };
  });

  // Get seasonal collections
  const seasonalCollections = [
    {
      name: "Spring Florals",
      description: "Fresh and blooming scents for spring",
      image: fragranceData.women.find(f => f.name.includes("Daisy"))?.image || fragranceData.women[0].image,
      query: "floral"
    },
    {
      name: "Summer Citrus",
      description: "Bright and refreshing summer fragrances",
      image: fragranceData.men.find(f => f.name.includes("Acqua"))?.image || fragranceData.men[0].image,
      query: "citrus"
    },
    {
      name: "Autumn Spices",
      description: "Warm and spicy scents for fall",
      image: fragranceData.unisex.find(f => f.name.includes("Tobacco"))?.image || fragranceData.unisex[0].image,
      query: "spicy"
    },
    {
      name: "Winter Woods",
      description: "Rich and cozy winter fragrances",
      image: fragranceData.unisex.find(f => f.name.includes("Oud"))?.image || fragranceData.unisex[1].image,
      query: "woody"
    }
  ];

  // Filter featured collections based on search
  const filteredFeaturedCollections = featuredCollections.filter(collection =>
    collection.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter seasonal collections based on search
  const filteredSeasonalCollections = seasonalCollections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fragrance Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections of fine fragrances, from iconic designer brands to exclusive niche perfumes.
          </p>
          {searchQuery && (
            <p className="text-purple-600 mt-2">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Featured Brands */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Featured Brands {searchQuery && `(Filtered)`}
          </h2>
          {filteredFeaturedCollections.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No brands found matching your search.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredFeaturedCollections.map((collection, index) => (
                <Link
                  key={index}
                  to={`/shop/all?brand=${encodeURIComponent(collection.brand)}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.brand}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">View Collection</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{collection.brand}</h3>
                    <p className="text-sm text-gray-600">{collection.count} {collection.count === 1 ? 'fragrance' : 'fragrances'}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Seasonal Collections */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Seasonal Collections {searchQuery && `(Filtered)`}
          </h2>
          {filteredSeasonalCollections.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No seasonal collections found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSeasonalCollections.map((collection, index) => (
                <Link
                  key={index}
                  to={`/shop/all?query=${collection.query}`}
                  className="relative h-64 rounded-lg overflow-hidden group block"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.description}</p>
                    <span className="inline-block mt-3 bg-white text-purple-700 px-4 py-2 rounded text-sm font-medium hover:bg-purple-50 transition-colors">
                      Explore Collection
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Special Collections */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Special Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/shop/new" className="bg-purple-100 rounded-lg p-6 block hover:bg-purple-200 transition-colors">
              <h3 className="font-bold text-lg text-purple-900 mb-2">Limited Editions</h3>
              <p className="text-purple-800 mb-4">Exclusive fragrances available for a limited time only.</p>
              <div className="text-purple-700 font-medium">
                View Limited Editions →
              </div>
            </Link>

            <Link to="/shop/bestsellers" className="bg-amber-100 rounded-lg p-6 block hover:bg-amber-200 transition-colors">
              <h3 className="font-bold text-lg text-amber-900 mb-2">Best Sellers</h3>
              <p className="text-amber-800 mb-4">Our most loved fragrances by customers worldwide.</p>
              <div className="text-amber-700 font-medium">
                Shop Best Sellers →
              </div>
            </Link>

            <Link to="/shop/new" className="bg-teal-100 rounded-lg p-6 block hover:bg-teal-200 transition-colors">
              <h3 className="font-bold text-lg text-teal-900 mb-2">New Arrivals</h3>
              <p className="text-teal-800 mb-4">Discover the latest additions to our fragrance portfolio.</p>
              <div className="text-teal-700 font-medium">
                Explore New Arrivals →
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Collections;