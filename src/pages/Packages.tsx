import React, { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import OrderModal from '../components/OrderModal';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 299,
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      description: 'Perfect for small businesses and startups',
      features: [
        'Logo Design (3 concepts)',
        'Business Card Design',
        'Letterhead Design',
        'Basic Brand Guidelines',
        '2 Revisions',
        '48-hour delivery',
        'High-resolution files',
        'Email support'
      ],
      deliverables: [
        'Logo files (PNG, JPG, PDF)',
        'Business card design',
        'Letterhead template',
        'Brand color guide'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 699,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      popular: true,
      description: 'Ideal for growing businesses and brands',
      features: [
        'Logo Design (5 concepts)',
        'Complete Brand Identity',
        'Business Stationery Suite',
        'Social Media Kit',
        'Website Design (5 pages)',
        'Brand Guidelines Manual',
        '5 Revisions',
        '72-hour delivery',
        'All file formats',
        'Priority support'
      ],
      deliverables: [
        'Complete brand identity package',
        'Logo variations and applications',
        'Business stationery suite',
        'Social media templates',
        'Website design mockups',
        'Comprehensive brand guidelines'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1299,
      icon: Crown,
      color: 'from-gradient-to-r from-purple-600 to-pink-600',
      popular: false,
      description: 'Complete branding solution for established companies',
      features: [
        'Logo Design (Unlimited concepts)',
        'Complete Brand Identity System',
        'Marketing Materials Suite',
        'Website Design (10+ pages)',
        'Mobile App Design Concepts',
        'Packaging Design',
        'Brand Strategy Consultation',
        'Unlimited Revisions',
        '1-week delivery',
        'All file formats + source files',
        '24/7 dedicated support',
        '6 months post-launch support'
      ],
      deliverables: [
        'Complete brand identity system',
        'Marketing materials suite',
        'Website design and development',
        'Mobile app design concepts',
        'Packaging design concepts',
        'Brand strategy document',
        'Implementation guidelines'
      ]
    }
  ];

  const handleOrderClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Package</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect design package for your business needs. All packages include professional design, 
            revisions, and high-quality deliverables.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                pkg.popular ? 'ring-4 ring-purple-500 ring-opacity-20' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-center mb-6">{pkg.description}</p>
                
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-600 ml-2">one-time</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleOrderClick(pkg)}
                  className={`w-full bg-gradient-to-r ${pkg.color} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What's included in the delivery?",
                answer: "All packages include high-resolution files in multiple formats (PNG, JPG, PDF, SVG), source files, and detailed brand guidelines."
              },
              {
                question: "How long does it take?",
                answer: "Delivery times vary by package: Starter (48 hours), Professional (72 hours), Enterprise (1 week). Rush delivery available upon request."
              },
              {
                question: "What if I need revisions?",
                answer: "All packages include revisions as specified. Additional revisions can be requested at a nominal fee to ensure your complete satisfaction."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes! We offer post-delivery support for all clients. Enterprise clients receive 6 months of dedicated support included."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Something Different?</h2>
          <p className="text-gray-600 mb-6">
            We also offer custom packages tailored to your specific requirements and budget.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Get Custom Quote
          </a>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Packages;