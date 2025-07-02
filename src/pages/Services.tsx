import React from 'react';
import { Palette, Monitor, Printer, Smartphone, Package, Megaphone, Pen, Camera, Video } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Brand Identity Design',
      description: 'Complete brand identity packages including logos, color schemes, typography, and brand guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography Selection', 'Business Cards', 'Letterheads'],
      image: 'https://ik.imagekit.io/minimind/Cover/logo%20and%20brand%20indentity.png?updatedAt=1750792615083'
    },
    {
      icon: Monitor,
      title: 'Web Design',
      description: 'Modern, responsive websites that provide exceptional user experiences and drive conversions.',
      features: ['Responsive Design', 'UI/UX Design', 'Landing Pages', 'E-commerce Design', 'Web Applications', 'Prototyping'],
      image: 'https://ik.imagekit.io/minimind/Cover/image.png?updatedAt=1750793541010'
    },
    {
      icon: Printer,
      title: 'Print Design',
      description: 'Professional print materials that make a lasting impression on your target audience.',
      features: ['Brochures', 'Flyers', 'Posters', 'Business Cards', 'Catalogs', 'Packaging Design'],
      image: 'https://ik.imagekit.io/minimind/Cover/Print%20desgn.png?updatedAt=1750792615731'
    },
    {
      icon: Video,
      title: 'Motion Graphics',
      description: 'Modern, responsive websites that provide exceptional user experiences and drive conversions.',
      features: ['Explainer Videos', 'Social Media Content', 'Website Animations', 'Presentations', 'Logo Animations', 'Animated Ads'],
      image: 'https://ik.imagekit.io/minimind/Cover/motion%20graphic.png?updatedAt=1750792615939'
    },
    {
      icon: Package,
      title: 'Packaging Design',
      description: 'Eye-catching packaging designs that help your products stand out on the shelves.',
      features: ['Product Packaging', 'Label Design', '3D Mockups', 'Retail Packaging', 'Shipping Boxes', 'Brand Integration'],
      image: 'https://ik.imagekit.io/minimind/Cover/packaging.png?updatedAt=1750792615028'
    },
    {
      icon: Megaphone,
      title: 'Social Media Graphics',
      description: 'Engaging social media visuals that boost your online presence and engagement rates.',
      features: ['Instagram Posts', 'Facebook Covers', 'Twitter Headers', 'LinkedIn Banners', 'Story Templates', 'Ad Creatives'],
      image: 'https://ik.imagekit.io/minimind/Cover/image(1).png?updatedAt=1750793675001'
    },
    {
      icon: Pen,
      title: 'Illustration',
      description: 'Custom illustrations that bring your ideas to life with unique artistic flair.',
      features: ['Digital Illustration', 'Character Design', 'Infographics', 'Editorial Illustration', 'Technical Drawings', 'Icon Design'],
      image: 'https://ik.imagekit.io/minimind/Cover/Illustrator.png?updatedAt=1750792622515'
    },
    {
      icon: Camera,
      title: 'Photography & Editing',
      description: 'Professional photography services and photo editing to showcase your brand perfectly.',
      features: ['Product Photography', 'Corporate Headshots', 'Photo Retouching', 'Image Editing', 'Stock Photography', 'Brand Photography'],
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };


  return (
    <div className="py-20 overflow-x-hidden"> {/* Added overflow-x-hidden */}
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive graphic design services to help your business stand out in today's competitive market.
            From brand identity to digital design, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div // Animate each service item
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              variants={itemVariants} // Use item variants
              initial="hidden" // Explicitly set initial state
              whileInView="visible" // Explicitly set whileInView state
              viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of item is visible
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }} // Add staggered delay
            >
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
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div // Animate the CTA Section
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default Services;