// PrivacyPolicy.jsx
import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-purple max-w-none">
            <p className="lead">
              At Ludas Perfumes, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your
              information when you visit our website or make a purchase.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>
                Personal identification information (name, email address, phone
                number)
              </li>
              <li>Shipping and billing address</li>
              <li>
                Payment information (credit card details are processed securely
                by our payment partners)
              </li>
              <li>Purchase history and preferences</li>
              <li>Communications between you and Ludas Perfumes</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including
              to:
            </p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you promotional communications (with your consent)</li>
              <li>Improve our website, products, and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul>
              <li>
                Service providers who assist in our operations (payment
                processing, shipping, marketing)
              </li>
              <li>
                Legal authorities when required by law or to protect our rights
              </li>
              <li>
                Business partners in the event of a merger, acquisition, or sale
                of assets
              </li>
            </ul>
            <p>
              All third-party service providers are required to maintain the
              confidentiality and security of your information.
            </p>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze site traffic, and personalize content. You can
              control cookies through your browser settings.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
            <p>
              To exercise these rights, please contact us at
              privacy@ludasperfumes.com.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the Internet or electronic storage is 100% secure.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for children under the age of 16. We
              do not knowingly collect personal information from children under
              16.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <address className="not-italic">
              Ludas Perfumes
              <br />
              123 Fragrance Avenue
              <br />
              New York, NY 10001
              <br />
              Email: privacy@ludasperfumes.com
              <br />
              Phone: +1 (555) 123-4567
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
