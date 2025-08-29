import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Leaf, Users, Truck, Shield } from 'lucide-react';
import aboutImg from '../assets/logo/about-img.png';

const About = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Natural Ingredients",
      description: "We source the finest natural ingredients from around the world to create authentic scents."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Crafted with Passion",
      description: "Each fragrance is carefully crafted by master perfumers with decades of experience."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "We maintain the highest standards of quality in every bottle we produce."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We're here to help you find your signature scent."
    }
  ];

  const stats = [
    { number: "200+", label: "Premium Fragrances" },
    { number: "50+", label: "International Brands" },
    { number: "100K+", label: "Happy Customers" },
    { number: "15", label: "Years of Excellence" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ludas Perfumes</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Since 2009, Ludas Perfumes has been curating the world's finest fragrances, bringing luxury scents
            to discerning customers across the globe. Our passion for perfumery drives us to discover exceptional
            fragrances that tell a story and create lasting memories.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-purple-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded by master perfumer Luis Silva, Ludas began as a small boutique in Lisbon with a vision to
                  make luxury fragrances accessible to everyone. What started as a passion project has grown into
                  a destination for fragrance enthusiasts worldwide.
                </p>
                <p className="text-gray-600 mb-4">
                  Our name "Ludas" comes from the Latin word for "play" or "game," reflecting our philosophy that
                  finding your signature scent should be an enjoyable journey of discovery rather than a serious
                  obligation.
                </p>
                <p className="text-gray-600">
                  Today, we continue to uphold our founding principles: exceptional quality, expert guidance, and
                  a genuine love for the art of perfumery.
                </p>
              </div>
              <div className="md:flex-1 ">
                <img
                  src={aboutImg}
                  alt="Perfume making process"
                  className="w-full h-100  px-10 pb-10 pt-15 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-purple-700 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold mb-2">{stat.number}</p>
                  <p className="text-purple-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Your payment information is safe with us</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">30-day return policy on all items</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Signature Scent?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our collections and discover fragrances that resonate with your personality and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop/women"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Shop Women's Fragrances
            </Link>
            <Link
              to="/shop/men"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Shop Men's Fragrances
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;