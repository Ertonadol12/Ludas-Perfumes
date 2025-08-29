// TermsOfService.jsx
import React, { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
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

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-purple max-w-none py-4">
            <p className="lead">
              Welcome to Ludas Perfumes. These Terms of Service govern your use
              of our website and services. By accessing or using our website,
              you agree to be bound by these terms.
            </p>

            <h2 className="font-bold">Eligibility</h2>
            <p>
              You must be at least 16 years old to use our website. By using our
              website, you represent and warrant that you are of legal age to
              form a binding contract and meet all eligibility requirements.
            </p>

            <h2 className="font-bold">Account Registration</h2>
            <p>
              To access certain features, you may need to register for an
              account. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur
              under your account.
            </p>

            <h2 className="font-bold">Products and Pricing</h2>
            <p>
              We strive to display accurate product information, including
              descriptions, images, and prices. However, we cannot guarantee
              that everything on our website is error-free. We reserve the right
              to correct any errors and to change or update information at any
              time without notice.
            </p>
            <p>
              All prices are in US dollars and are subject to change without
              notice. We are not responsible for typographical errors regarding
              price or product information.
            </p>

            <h2 className="font-bold">Orders and Acceptance</h2>
            <p>
              Your order constitutes an offer to purchase our products. We
              reserve the right to accept or decline your order for any reason.
              Order acceptance occurs when we ship the product(s) to you.
            </p>

            <h2 className="font-bold">Payment</h2>
            <p>
              Payment must be made at the time of order. We accept various
              payment methods as indicated on our website. You represent and
              warrant that you have the legal right to use any payment method
              you provide.
            </p>

            <h2 className="font-bold">Shipping and Delivery</h2>
            <p>
              Shipping times are estimates and not guaranteed. We are not
              responsible for delays caused by carriers or other factors beyond
              our control. Risk of loss passes to you upon delivery to the
              carrier.
            </p>

            <h2 className="font-bold">Returns and Refunds</h2>
            <p>
              Please review our Return Policy for details on returns and
              refunds. We reserve the right to modify our return policy at any
              time.
            </p>

            <h2 className="font-bold">Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos,
              images, and software, is the property of Ludas Perfumes or its
              content suppliers and is protected by intellectual property laws.
            </p>

            <h2 className="font-bold">User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our website for any illegal purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>
                Interfere with the security or functionality of our website
              </li>
              <li>
                Attempt to gain unauthorized access to any part of our website
              </li>
            </ul>

            <h2 className="font-bold">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Ludas Perfumes shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use
              our website or products.
            </p>

            <h2 className="font-bold">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Ludas Perfumes and its
              affiliates from any claims, damages, losses, or expenses arising
              from your use of our website or violation of these terms.
            </p>

            <h2 className="font-bold">Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of
              New York, without regard to its conflict of law principles.
            </p>

            <h2 className="font-bold">Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Changes will be effective
              upon posting to our website. Your continued use of our website
              after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="font-bold">Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <address className="not-italic">
              Ludas Perfumes
              <br />
              123 Fragrance Avenue
              <br />
              Ethiopia, Addis Ababa 1000
              <br />
              Email: legal@ludasperfumes.com
              <br />
              Phone: +251 (9) 28 252 850
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
