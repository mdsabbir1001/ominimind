import React from 'react';
import { Palette, Monitor, Printer, Smartphone, Package, Megaphone, Pen, Camera, Video } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Brand Identity Design',
      description: 'Complete brand identity packages including logos, color schemes, typography, and brand guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography Selection', 'Business Cards', 'Letterheads'],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Monitor,
      title: 'Web Design',
      description: 'Modern, responsive websites that provide exceptional user experiences and drive conversions.',
      features: ['Responsive Design', 'UI/UX Design', 'Landing Pages', 'E-commerce Design', 'Web Applications', 'Prototyping'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Printer,
      title: 'Print Design',
      description: 'Professional print materials that make a lasting impression on your target audience.',
      features: ['Brochures', 'Flyers', 'Posters', 'Business Cards', 'Catalogs', 'Packaging Design'],
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Video,
      title: 'Motion Graphics',
      description: 'Modern, responsive websites that provide exceptional user experiences and drive conversions.',
      features: ['Explainer Videos', 'Social Media Content', 'Website Animations', 'Presentations', 'Logo Animations', 'Animated Ads'],
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Package,
      title: 'Packaging Design',
      description: 'Eye-catching packaging designs that help your products stand out on the shelves.',
      features: ['Product Packaging', 'Label Design', '3D Mockups', 'Retail Packaging', 'Shipping Boxes', 'Brand Integration'],
      image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Megaphone,
      title: 'Social Media Graphics',
      description: 'Engaging social media visuals that boost your online presence and engagement rates.',
      features: ['Instagram Posts', 'Facebook Covers', 'Twitter Headers', 'LinkedIn Banners', 'Story Templates', 'Ad Creatives'],
      image: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Pen,
      title: 'Illustration',
      description: 'Custom illustrations that bring your ideas to life with unique artistic flair.',
      features: ['Digital Illustration', 'Character Design', 'Infographics', 'Editorial Illustration', 'Technical Drawings', 'Icon Design'],
      image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Camera,
      title: 'Photography & Editing',
      description: 'Professional photography services and photo editing to showcase your brand perfectly.',
      features: ['Product Photography', 'Corporate Headshots', 'Photo Retouching', 'Image Editing', 'Stock Photography', 'Brand Photography'],
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive graphic design services to help your business stand out in today's competitive market. 
            From brand identity to digital design, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-xl w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't see exactly what you're looking for? We specialize in creating custom design solutions 
            tailored to your unique needs and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get a Quote
            </a>
            <a
              href="/packages"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Packages
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;