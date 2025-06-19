import React, { useState } from 'react';
// Function: ID
const getAspectRatio = (project: Project): string => {
  // ID based specific ratio override
  const idBasedRatios: { [key: number]: string } = {
    1: '16 / 9', // Branding
    2: '16 / 9', // Web Design
    3: '3 / 4', // Food & Beverage
    301: '1 / 1', // Product Ads
    302: '3 / 4', // Hoodie
    303: '1 / 1', // Real Estate Social Media
    304: '16 / 9', // YouTube Thumbnails
    305: '1 / 1', // Travel & Tourism
    5: '16 / 9' ,// Packaging Design
    501: '15 / 9' ,// Packaging Design
    502: '6 / 4' // Packaging Design

  };

  // Category based fallback ratios
  const categoryBasedRatios: { [key: string]: string } = {
    branding: '4 / 5',
    web: '16 / 9',
    socialmedia: '9 / 16',
    print: '3 / 4',
    packaging: '1 / 1',
    all: '1 / 1'
  };

  // Priority: ID check > Category check > Default
  return idBasedRatios[project.id] || categoryBasedRatios[project.category] || '1 / 1';
};

import { ExternalLink, Eye, Filter, X } from 'lucide-react';

// Define a type for the project
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  cardImage: string; // Image for the project card
  modalImages: string[]; // Array of images for the modal
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'branding', name: 'Branding' },
    { id: 'web', name: 'Web Design' },
    { id: 'socialmedia', name: 'Social Media' },
    { id: 'print', name: 'Print Design' },
    { id: 'packaging', name: 'Packaging' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'TechStart Brand Identity',
      category: 'branding',
      description: 'Complete brand identity design for a technology startup',
      cardImage: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      modalImages: [
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      id: 2,
      title: 'GreenEarth Website',
      category: 'web',
      description: 'Responsive website design for environmental consulting firm',
      cardImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      modalImages: [
        'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    ///// Start Social Media
    {
      id: 3,
      title: 'Food & Beverage',
      category: 'socialmedia',
      description: "Custom design solutions for your restaurant or food brand. We capture the taste and quality of your offerings through stunning visuals that attract customers and boost sales. From social media to packaging, we've got you covered.",
      cardImage: 'https://i.ibb.co/939qFb8Z/unnamed.png',
      modalImages: [
        'https://i.ibb.co/Kx3mwYQW/FOOD-MANU-1.png',
        'https://i.ibb.co/G4dRZvrY/FOOD-MANU-2.png',
        'https://i.ibb.co/yn0YSk9K/FOOD-MANU-4.png',
        'https://i.ibb.co/TVjWB8G/FOOD-MANU.png',
        'https://i.ibb.co/SwDxDBZP/1.png',
        'https://i.ibb.co/pjfvxjnT/2.png'
      ]
    }, 
    {
      id: 301,
      title: 'Product Ads',
      category: 'socialmedia',
      description: "Stop the scroll and capture your audience. We create social media ads that don't just look beautiful - they deliver your brand's message clearly and are built to drive sales. Let our designs make your next campaign a success.",
      cardImage: 'https://i.ibb.co/mV8LWNDh/Gemini-Generated-Image-avrlr2avrlr2avrl.png',
      modalImages: [
        'https://i.ibb.co/21KG4PfP/mobile-tech-ads-design.jpg',
        'https://i.ibb.co/Mk7FXNg5/5.png',
        'https://i.ibb.co/pDjC7mL/monile-ad-design.jpg',
        'https://i.ibb.co/mrRGHZQS/4.png',
        'https://i.ibb.co/1JpCmjgL/mobile-ad-design-ipone.jpg',
        'https://i.ibb.co/hw9MJ2x/no-1-edit.jpg',
        'https://i.ibb.co/39n1cPS8/2.png',
        'https://i.ibb.co/p6CNN13D/Untitled-2.png',
      ]
    },
    {
      id: 302,
      title: 'Hoodie',
      category: 'socialmedia',
      description: "Sell more than just hoodies! sell a lifestyle. Our social media designs for fashion brands create a powerful online presence, turning followers into loyal customers.",
      cardImage: 'https://i.ibb.co/bMFywxgD/Image-tv8u5htv8u5htv8u.png',
      modalImages: [
        'https://i.ibb.co/CK9q0tRp/hoodei-design-1.jpg',
        'https://i.ibb.co/MkhDC2Q1/hoodei-design-2.jpg',
        'https://i.ibb.co/hRHNVZzq/hoodie-4.jpg',
        'https://i.ibb.co/kg6jdttj/hoodie-new-2.jpg',
        'https://i.ibb.co/zHQGDjTn/hoodie-new.jpg',
        'https://i.ibb.co/9BXSLKw/hoodie-3.png',
      ]
    },
    {
      id: 303,
      title: 'Real Estate Social Media',
      category: 'socialmedia',
      description: "Elevate your real estate brand's online presence with our stunning social media designs. We create visually appealing covers and ads that capture attention and drive engagement for your property listings and company.",
      cardImage: 'https://i.ibb.co/qYFztsdW/Image-im3av1im3av1im3a.png',
      modalImages: [
        'https://i.ibb.co/6RPtTynV/real-state-design-4.jpg',
        'https://i.ibb.co/Gf1Jrdxq/e390c9215329117-676953272217e.jpg',
        'https://i.ibb.co/LzyLSgqN/real-estate-3.jpg',
        'https://i.ibb.co/LXXxGd7T/real-estate-design.jpg',
      ]
    },
    {
      id: 304,
      title: 'YouTube Thaumbnails',
      category: 'socialmedia',
      description: "our video's first impression matters. We create professional, high-quality YouTube thumbnails designed to stop the scroll, spark curiosity, and dramatically increase your views.",
      cardImage: 'https://i.ibb.co/FTL45W0/kwuasokwuasokwua.png',
      modalImages: [
        'https://i.ibb.co/prP96NBh/Ai-Youtube-Thambnail.png',
        'https://i.ibb.co/8nqHXb9v/8874d8205922893-66c404eb92232.jpg',
        'https://i.ibb.co/xtD41Tt5/image.png',
        'https://i.ibb.co/LdMSRd3s/e67dda205922893-66c404eb91d53.jpg',
        'https://i.ibb.co/rRMN9Ljw/image.png',
        'https://i.ibb.co/LXqp25Z9/image.png',
        'https://i.ibb.co/V0BzBgSJ/image.png',
        'https://i.ibb.co/4kdBvzV/image.png',
        'https://i.ibb.co/jPH2ZDCG/496943370-643749558620057-1703896485107095177-n.jpg',
        'https://i.ibb.co/KjQ27Bnv/tgjjgj.jpg',
      ]
    },
    {
      id: 305,
      title: 'Travel & Tourism',
      category: 'socialmedia',
      description: "our video's first impression matters. We create professional, high-quality YouTube thumbnails designed to stop the scroll, spark curiosity, and dramatically increase your views.",
      cardImage: 'https://i.ibb.co/FTL45W0/kwuasokwuasokwua.png',
      modalImages: [
        'https://i.ibb.co/YF92z8B3/sklkiefh.png',
        'https://i.ibb.co/0jQNP4PX/adf.png',
        'https://i.ibb.co/5hHMh3Z7/asdf.png',
      ]
    },
    /////Social Media End
    ///// Start Print Design




    //// End Print Design
    //// Start Packaging Design
    {
      id: 5,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Creative and structural packaging design for beauty products. We craft unique boxes that not only protect the product but also tell a compelling brand story from the first glance.",
      cardImage: 'https://i.ibb.co/vvXMZmWJ/mud-mask-box.jpg',
      modalImages: [
        'https://i.ibb.co/wNdvrFYC/5.png',
        'https://i.ibb.co/23DWzQms/1.jpg',
        'https://i.ibb.co/TMy9XGXW/2.jpg',
        'https://i.ibb.co/CpNPyGCT/3.jpg',
        'https://i.ibb.co/zWNTRjBy/4.jpg',
      ]
    },
    {
      id: 501,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Clean and fresh packaging design for cosmetic and skincare brands. Our designs reflect the purity and quality of your natural ingredients, creating an irresistible appeal for customers.",
      cardImage: 'https://i.ibb.co/Df0zJJg0/Essential-Oil-Dropper-Bottle-Mockup-min.jpg',
      modalImages: [
        'https://i.ibb.co/sJHYjHNd/01-min.jpg',
        'https://i.ibb.co/FfPfqsc/essential-3-jpg-min.jpg',
        'https://i.ibb.co/Df0zJJg0/Essential-Oil-Dropper-Bottle-Mockup-min.jpg',
        'https://i.ibb.co/GQCDfVf8/Essential-Oil-Bottle-Mockup-min.jpg',
        'https://i.ibb.co/fVWYr2GW/Free-Dropper-Bottle-Mockup-3-min.jpg',
        'https://i.ibb.co/Mx40XD06/mockup-essential-05-min.jpg',
      ]
    },
    {
      id: 502,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Professional and trustworthy packaging for pharmaceutical and wellness products. We design clear, informative, and clean packaging that builds consumer confidence and communicates reliability.",
      cardImage: 'https://i.ibb.co/kV9D4S06/Package-Box-02-579-min.png',
      modalImages: [
        'https://i.ibb.co/kV9D4S06/Package-Box-02-579-min.png',
        'https://i.ibb.co/C5H2Vgdd/X-NG-NANO-min.png',
        'https://i.ibb.co/KzxSyh87/Box-Vol-1-Top-2-min.jpg',
      ]
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Function to handle right-click and prevent saving
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of successful projects and see how we've helped businesses
            transform their brand presence through exceptional design.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center mr-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Filter by:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={project.cardImage}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex space-x-2">
                      <button
                        className="w-10 h-10 bg-[#2563eb] backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        onClick={() => openModal(project)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/20 hover:bg-white/20 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's work together to bring your vision to life. Start your design journey today
            and see your brand transform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/packages"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Choose a Package
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto relative">
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
              <p className="text-gray-700">{selectedProject.description}</p>
            </div>

            {/* Image Grid */}
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-[60vh]">
              {selectedProject.modalImages.map((image, index) => (
                <div key={index} className="w-full">
                  <div style={{ aspectRatio: getAspectRatio(selectedProject) }}>
                    <img
                      src={image}
                      alt={`${selectedProject.title} - ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      onContextMenu={handleContextMenu}
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;