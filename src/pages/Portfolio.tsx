import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem, PortfolioCategory } from '../../types';
import { API_URL } from "../utils/api";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const arrowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPortfolioItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/portfolio-projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      const data: PortfolioItem[] = await response.json();
      setPortfolioItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio-categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data: PortfolioCategory[] = await response.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
    fetchCategories();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const filters = [
    { id: 'all', name: 'All Projects' },
    ...categories.map(category => ({
      id: category.name,
      name: category.name.charAt(0).toUpperCase() + category.name.slice(1)
    }))
  ];

  const filteredProjects = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(project => project.category_name === activeFilter);

  const openModal = (project: PortfolioItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setCurrentContentIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsFullScreenOpen(false);
    setCurrentContentIndex(0);
    if (arrowTimerRef.current) {
      clearTimeout(arrowTimerRef.current);
    }
  };

  const openFullScreen = (index: number) => {
    setCurrentContentIndex(index);
    setIsFullScreenOpen(true);
    setShowArrows(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
    if (arrowTimerRef.current) {
      clearTimeout(arrowTimerRef.current);
    }
  };

  const goToPreviousImage = () => {
    if (selectedProject) {
      setCurrentContentIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.project_images.length - 1 : prevIndex - 1
      );
      setShowArrows(true);
    }
  };

  const goToNextImage = () => {
    if (selectedProject) {
      setCurrentContentIndex((prevIndex) =>
        prevIndex === selectedProject.project_images.length - 1 ? 0 : prevIndex + 1
      );
      setShowArrows(true);
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setShowArrows(true);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!selectedProject) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeThreshold = 50;

    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.classList.contains('relative')) {
       if (touchStartX.current - touchEndX > swipeThreshold) {
        goToNextImage();
      } else if (touchEndX - touchStartX.current > swipeThreshold) {
        goToPreviousImage();
      } else {
        setShowArrows(prev => !prev);
      }
    }
  };

  useEffect(() => {
    if (isFullScreenOpen && showArrows) {
      if (arrowTimerRef.current) {
        clearTimeout(arrowTimerRef.current);
      }
      arrowTimerRef.current = setTimeout(() => {
        setShowArrows(false);
      }, 1000);
    }

    return () => {
      if (arrowTimerRef.current) {
        clearTimeout(arrowTimerRef.current);
      }
    };
  }, [isFullScreenOpen, showArrows, currentContentIndex]);

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of successful projects and see how we've helped businesses
            transform their brand presence through exceptional design.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
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
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image_url}
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
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
              <p className="text-gray-700">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-[60vh]">
              {(selectedProject.project_images || []).slice().reverse().map((imageUrl, index) => (
                <div
                  key={imageUrl}
                  className="w-full cursor-pointer"
                  style={{ aspectRatio: selectedProject.aspect_ratio || 'auto' }}
                  onClick={() => openFullScreen(index)}
                >
                  <img
                    src={imageUrl}
                    alt={`${selectedProject.title} - ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onContextMenu={handleContextMenu}
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isFullScreenOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setShowArrows(true)}
        >
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src={selectedProject.project_images[currentContentIndex]}
              alt={`${selectedProject.title} - ${currentContentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onContextMenu={handleContextMenu}
              draggable="false"
            />

            {selectedProject.project_images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity ${showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity ${showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;