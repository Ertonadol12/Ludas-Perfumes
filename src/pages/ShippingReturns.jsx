// ShippingReturns.jsx
import React, { useEffect } from "react";
import { Truck, Clock, RefreshCw, Shield, Package } from "lucide-react";

const ShippingReturns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const shippingOptions = [
    {
      icon: <Truck className="h-8 w-8" />,
      name: "Standard Shipping",
      price: "$4.99",
      time: "5-7 business days",
      description: "Free on orders over $50",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      name: "Express Shipping",
      price: "$9.99",
      time: "2-3 business days",
      description: "Order by 2pm EST for same-day dispatch",
    },
    {
      icon: <Package className="h-8 w-8" />,
      name: "Next Day Delivery",
      price: "$19.99",
      time: "Next business day",
      description: "Order by 12pm EST for next-day delivery",
    },
  ];

  const returnPolicy = [
    {
      title: "30-Day Return Policy",
      description:
        "We offer a 30-day return policy on all unused, unopened items in their original packaging.",
    },
    {
      title: "Easy Returns Process",
      description:
        "Initiate your return online through your account or contact our customer service team.",
    },
    {
      title: "Free Returns",
      description:
        "We provide free return shipping labels for all returns within the contiguous US.",
    },
    {
      title: "Refund Processing",
      description:
        "Refunds are processed within 3-5 business days after we receive your returned items.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shipping & Returns
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make shopping with us easy and risk-free with transparent
            shipping options and a hassle-free return policy.
          </p>
        </div>

        {/* Shipping Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Shipping Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="text-purple-600 mb-4 flex justify-center">
                  {option.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
                <p className="text-2xl font-bold text-purple-700 mb-2">
                  {option.price}
                </p>
                <p className="text-gray-600 mb-2">{option.time}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-100 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">
              International Shipping
            </h3>
            <p className="text-gray-700">
              We ship to over 50 countries worldwide. International shipping
              rates and delivery times vary by destination. Duties and taxes may
              apply depending on your country's regulations.
            </p>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Return Policy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {returnPolicy.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Important Notes</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                Fragrances must be in their original, unopened condition to be
                eligible for return
              </li>
              <li>
                Return shipping is free for US customers; international
                customers are responsible for return shipping costs
              </li>
              <li>
                Sale items are final and cannot be returned unless defective
              </li>
              <li>Gift cards and samples are non-returnable</li>
            </ul>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Need More Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Track Your Order</h3>
              <p className="text-gray-600 mb-4">
                Once your order ships, you'll receive a tracking number via
                email. You can also track your order by logging into your
                account.
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Track Order
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Start a Return</h3>
              <p className="text-gray-600 mb-4">
                Ready to return an item? Start the process through your account
                or contact our customer service team for assistance.
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Initiate Return
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturns;
