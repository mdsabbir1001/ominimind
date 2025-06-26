import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Sparkles } from 'lucide-react';

const Home = () => {
  // State to keep track of the current image index for the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image URLs for the slider
  const heroImages = [
    'https://ik.imagekit.io/minimind/Cover/Illustration.png?updatedAt=1750969715455',
    'https://ik.imagekit.io/minimind/Cover/Motions.png?updatedAt=1750970380533',
    'https://ik.imagekit.io/minimind/Cover/Social%20Media.png?updatedAt=1750969086377',
    // Add more image URLs here
  ];

  // Effect to handle auto-sliding
  useEffect(() => {
    // Set up an interval to change the image index every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        // Cycle back to the first image if we are at the last one
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change image every 7 seconds (7000ms)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [heroImages.length]); // Re-run effect if the number of images changes


  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hero Background Image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
           <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10"> {/* Added z-10 to bring content above images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column (Text and Buttons) */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Elevate Your Brand with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Minimind
                </span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                We specialize in creating stunning graphic designs for new businesses,
                supporting marketing agencies, and generating innovative ideas that drive business expansion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/packages"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
            {/* Removed the right column content (static image/slider) */}
             <div className="hidden lg:block">
                {/* This column is now empty or can be used for other content if needed */}
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { number: '10+', label: 'Projects Completed', icon: Award },
              { number: '90%', label: 'Happy Clients', icon: Users },
              ///{ number: '2', label: 'Years Experience', icon: Sparkles },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Design Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From brand identity to digital designs, we offer comprehensive graphic design solutions
              tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Brand Identity',
                description: 'Complete branding solutions including logos, business cards, and brand guidelines.',
                image: 'https://ik.imagekit.io/minimind/Cover/logo%20and%20brand%20indentity.png?updatedAt=1750792615083',
              },
              {
                title: 'Social Media Design',
                description: 'Elevate your brand with stunning, custom social media visuals. We design a professional identity that builds trust and creates a lasting impression.',
                image: 'https://ik.imagekit.io/minimind/Cover/image(1).png?updatedAt=1750793675001',
              },
              {
                title: 'Marketing & Print Materials',
                description: 'Impactful print designs that clearly communicate your message. From informative brochures to action-driven flyers, we create materials that help grow your business.',
                image: 'https://ik.imagekit.io/minimind/Cover/Marketing%20&%20Print%20Materials.png?updatedAt=1750792615429',
              },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's create something amazing together. Start your design journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Packages
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;