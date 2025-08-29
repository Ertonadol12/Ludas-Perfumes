// FAQ.jsx
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: "Ordering & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "To place an order, simply browse our collection, add items to your cart, and proceed to checkout. You'll need to provide your shipping information and payment details to complete your purchase.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through encrypted channels.",
        },
        {
          question: "Can I modify or cancel my order after placing it?",
          answer:
            "Orders can be modified or cancelled within 1 hour of placement. After this window, your order enters our processing system and cannot be changed. Please contact customer service immediately if you need to make changes.",
        },
      ],
    },
    {
      title: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and next-day delivery is available for orders placed before 12pm EST. International shipping times vary by destination.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary based on the destination. Customs duties and taxes may apply depending on your country's regulations.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and viewing your order history.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for unused, unopened items in their original packaging. Returns are free for US customers. International customers are responsible for return shipping costs.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, log into your account, go to your order history, and initiate a return. You'll receive a return label and instructions. Alternatively, contact our customer service team for assistance.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are processed within 3-5 business days after we receive your returned items. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
        },
      ],
    },
    {
      title: "Products & Fragrance",
      questions: [
        {
          question: "How long does perfume last?",
          answer:
            "Most fragrances will last 3-5 years if stored properly in a cool, dark place away from direct sunlight and extreme temperatures. The shelf life can vary based on the fragrance composition.",
        },
        {
          question: "How should I store my fragrances?",
          answer:
            "Store fragrances in their original boxes in a cool, dark place away from direct sunlight, heat sources, and humidity. Bathrooms are not ideal storage locations due to temperature fluctuations.",
        },
        {
          question: "Do you offer samples?",
          answer:
            "Yes, we offer sample sets that allow you to try multiple fragrances before committing to a full bottle. Samples are also included with every order.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our products, ordering
            process, shipping, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <h2 className="text-xl font-bold text-gray-900 p-6 border-b border-gray-200">
                {category.title}
              </h2>

              <div className="divide-y divide-gray-200">
                {category.questions.map((item, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isActive = activeIndex === index;

                  return (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <span className="font-medium text-gray-900">
                          {item.question}
                        </span>
                        {isActive ? (
                          <ChevronUp className="h-5 w-5 text-purple-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-purple-600" />
                        )}
                      </button>

                      {isActive && (
                        <div className="mt-4 text-gray-600">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-purple-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help you with any other
            questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@ludasperfumes.com"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium border border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
