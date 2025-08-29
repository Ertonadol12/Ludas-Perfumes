// Footer.jsx
import { Facebook, Instagram, Twitter, Mail, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = ({ closeMobileMenu, closeShopDropdown }) => {
  return (
    <footer className="bg-purple-200 border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <a
              href="/"
              className="text-2xl font-serif font-bold text-purple-700 block mb-4"
            >
              Ludas Perfumes
            </a>
            <p className="text-gray-600 text-sm max-w-md mb-6">
              Discover the essence of luxury with our exquisite collection of
              fine fragrances. Each scent tells a story, crafted with the finest
              ingredients for the discerning individual.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-700 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-700 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-700 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop/women"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Women's Fragrances
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/men"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Men's Fragrances
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/unisex"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Unisex Fragrances
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/bestsellers"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/new"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-purple-700 text-sm transition-colors duration-200"
                  onClick={() => {
                    closeMobileMenu?.();
                    closeShopDropdown?.();
                  }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay in the Know
              </h3>
              <p className="text-gray-600 text-sm">
                Subscribe to our newsletter for exclusive offers, new arrivals,
                and fragrance tips.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-100 bg-purple-100 rounded-full text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-800 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-purple-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-black text-sm">
              © {new Date().getFullYear()} Ludas Perfumes. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-black" />
              <span className="text-black text-sm">
                We accept all major credit cards
              </span>
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-black  hover:text-purple-900 text-sm transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu?.();
                  closeShopDropdown?.();
                  window.location.href = "/privacy";
                }}
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-black  hover:text-purple-900 text-sm transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu?.();
                  closeShopDropdown?.();
                  window.location.href = "/terms";
                }}
              >
                Terms
              </a>
              <a
                href="/contact"
                className="text-black  hover:text-purple-900 text-sm transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu?.();
                  closeShopDropdown?.();
                  window.location.href = "/contact";
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
