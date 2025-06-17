import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Wrench } from 'lucide-react'; // Wrench আইকন যোগ করা হয়েছে
import OrderModal from '../components/OrderModal';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      description: 'Perfect for small businesses and startups',
      features: [
        'Logo Design (3 concepts)',
        'Business Card Design',
        'Letterhead Design',
        'Basic Brand Guidelines (1 page)',
        '2 Revisions',
        '48-hour delivery',
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
      price: 199,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      popular: true,
      description: 'Ideal for growing businesses and brands',
      features: [
        'Logo Design (4-5 concepts)',
        'Full Stationery Design',
        'Brand Guideline (4–5 pages)',
        '5 Revisions',
        'Social Media Kit (profile, cover, 3 posts)',
        'Delivery in 4 Days',

      ],
      deliverables: [
        'All source files',
        'All standard formats',
        'JPEG, PNG, PDF',
        'AI, EPS, SVG',
        'Priority Email Support',
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 399+"+",
      icon: Crown,
      color: 'from-gradient-to-r from-purple-600 to-pink-600',
      popular: false,
      description: 'Complete branding solution for established companies',
      features: [
        'Logo Design (Unlimited concepts)',
        'Complete Brand Identity System',
        'Website Design (up to 5 pages)',
        'Packaging Design',
        'Brand Strategy (PDF report)',
        'Unlimited Revisions',
        'Dedicated support'
      ],
      deliverables: [
        'Source files + All formats',
        '1-on-1 Creative Call',
        '6 Months Support',
      ]
    }
  ];

  const handleOrderClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Package</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select the perfect design package for your business needs. All packages include professional design and high-quality deliverables.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 flex flex-col ${
                pkg.popular ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3/4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold rounded-full shadow-lg z-10">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 pt-10 flex-grow flex flex-col">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center`}>
                    <pkg.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{pkg.name}</h3>
                <p className="text-sm text-gray-500 text-center mb-4 h-10">{pkg.description}</p>
                
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-1">one-time</span>
                </div>
                
                <div className='flex-grow'>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">What's Included:</h4>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">What You'll Get:</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                      {pkg.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start">
                           <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                           <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => handleOrderClick(pkg)}
                    className={`w-full bg-gradient-to-r ${pkg.color} text-white py-2.5 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Custom Package CTA Start--- */}
        <div className="mt-20 bg-white p-10 rounded-2xl shadow-lg text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-blue-600" />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Need a Custom Package?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                If our standard packages don't quite fit your project's needs, we're happy to create a custom plan just for you. Get in touch to discuss your requirements and we'll provide a tailored quote.
            </p>
            <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
                Get a Custom Quote
            </a>
        </div>
        {/* --- Custom Package CTA End --- */}
        
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Packages;