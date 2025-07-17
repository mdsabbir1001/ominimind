import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Crown, Wrench } from 'lucide-react';
import OrderModal from '../components/OrderModal';
import { motion } from 'framer-motion';
import { Package as PackageType } from '../../types';
import { API_URL } from '../utils/api';

const Packages = () => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/packages`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data: PackageType[] = await response.json();
      setPackages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleOrderClick = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div // Animate the Header
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Package</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select the perfect design package for your business needs. All packages include professional design and high-quality deliverables.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div // Animate the Packages Grid container
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {packages.map((pkg) => (
            <motion.div // Animate each package card
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg flex flex-col ${
                pkg.is_popular ? 'ring-4 ring-purple-500' : ''
              }`}
              variants={itemVariants} // Apply item animation to each card (whileInView)
              whileHover={{ scale: 1.05 }} // Add framer-motion hover animation
              transition={{ duration: 0.3 }} // Add a transition duration for the hover effect
            >
              {pkg.is_popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3/4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold rounded-full shadow-lg z-10">
                  Most Popular
                </div>
              )}

              <div className="p-6 pt-10 flex-grow flex flex-col">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center`}>
                    <Star className="w-7 h-7 text-white" />
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
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleOrderClick(pkg)}
                    className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Custom Package CTA Start--- */}
        <motion.div // Animate the Custom Package CTA section
          className="mt-20 bg-white p-10 rounded-2xl shadow-lg text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>
        {/* --- Custom Package CTA End --- */}

      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPkg={selectedPackage}
      />
    </div>
  );
};

export default Packages;